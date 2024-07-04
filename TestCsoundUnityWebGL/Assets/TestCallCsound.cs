using UnityEngine;
using System.Runtime.InteropServices;
using UnityEngine.UI;
using System.Collections;
using System.Collections.Generic;
using System;

public class TestCallCsound : MonoBehaviour
{
    [SerializeField] 
    private GameObject _introText;
    [SerializeField] 
    private GameObject _infoContainer;

    AudioSource _audioSource;

#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void csoundInitialize(int variation, string filesToLoad, string csdText, int callback);
    
    [DllImport("__Internal")]
    private static extern void csoundStop(int instanceId, int callback);

    [DllImport("__Internal")]
    private static extern void csoundTest(int variation);

    [DllImport("__Internal")]
    private static extern void csoundSetChannel(int instanceId, string channel, float value);

    [DllImport("__Internal")]
    private static extern void csoundGetTable(int instanceId, int tableId, IntPtr callback);

    [DllImport("__Internal")]
    private static extern int csoundSetOption(int instanceId, string CsOption, int callback);

    [DllImport("__Internal")]
    private static extern int csoundInputMessage(int instanceId, string scoreEvent);


    private delegate void CsoundInitializeCallback(int instanceId);

    private delegate void CsoundGetTableCallback(int instanceId, int tableLength, IntPtr tableId);

    private delegate void CsoundSetOptionCallback(int instanceId, int res);

    private delegate void CsoundStopCallback(int instanceId);

    private bool _audioContextUnlocked;
    private static HashSet<int> _instances = new HashSet<int>();

    private string keepAliveTest = "\n      <CsoundSynthesizer>\n      <CsOptions>\n          -odac\n      </CsOptions>\n      <CsInstruments>\n          0dbfs = 1\n      \n          chnset(440, \"freq\")\n      \n          instr 1\n          out poscil(0dbfs/3, chnget:k(\"freq\")) * linen:a(1, .01, p3, .01)\n          endin\n      </CsInstruments>\n      <CsScore>\n          i 1 0 z\n      </CsScore>\n      </CsoundSynthesizer>\n      ";

    private string microphoneTest =
            "<CsoundSynthesizer>\n<CsOptions>\n-iadc -odac\n</CsOptions>\n<CsInstruments>\nsr=44100\nksmps=32\n0dbfs=1\nnchnls=2\n\nga1 init 0\nga2 init 0\n\ninstr 1\n  ;; read audio signal from audio input channel 1\n  asig = inch(1)\n  \n  asig *= 0.5\n  \n  ;; send signal directly to out\n  out(asig, asig)\n\n  ;; send 0.25 signal to reverb\n  afb = asig * 0.25\n  ga1 += afb\n  ga2 += afb\nendin\n\ninstr FBReverbMixer \n  afb0 init 0\n  afb1 init 0\n\n  ;; dry and reverb send signals  \n  al, ar reverbsc ga1, ga2, 0.95, 5000\n  \n  a1 = tanh(al) \n  a2 = tanh(ar)\n\n  a1 += afb0\n  a2 += afb1\n \n  kfb_amt = 0.9  ;; feedback amount\n  kfb_dur = 2000 ;; time in ms\n\n  afb0 = vdelay(a1 * kfb_amt, kfb_dur, 10000)\n  afb1 = vdelay(a2 * kfb_amt, kfb_dur, 10000)\n\n  kamp = 1.0 \t;; amplitude adjustmnet\n  a1 *= kamp\n  a2 *= kamp\n  \n  out(a1, a2)\n  \n  ga1 = 0\n  ga2 = 0\n\nendin \n\n;; start instruments as always-on\nschedule(1, 0, -1)\nschedule(\"FBReverbMixer\", 0, -1)\n</CsInstruments>\n<CsScore>\n</CsScore>\n</CsoundSynthesizer>";
    
    private string tableTest = "<CsoundSynthesizer>\n<CsOptions>\n; Select audio/midi flags here according to platform\n; Audio out   Audio in\n-odac    ;;;realtime audio out\n; For Non-realtime ouput leave only the line below:\n; -o table.wav -W ;;; for file output any platform\n</CsOptions>\n<CsInstruments>\n\n; by Kevin Conder\n\nsr = 44100\nksmps = 32\nnchnls = 2\n0dbfs  = 1\n\ninstr 1\n  \nkndx line 0, p3, 1                  ; Vary our index linearly from 0 to 1.\n\nifn = 1                             ; Read Table #1 with our index.\nixmode = 1\nkfreq table kndx, ifn, ixmode\na1 oscil .5, kfreq, 2; Generate a sine waveform, use our table values to vary its frequency.\nouts a1, a1\nendin\n\n</CsInstruments>\n<CsScore>\nf 1 0 1025 -7 200 1024 2000 ; Table #1, a line from 200 to 2,000.\nf 2 0 16384 10 1            ; Table #2, a sine wave.\n\ni 1 0 z\ne\n</CsScore>\n</CsoundSynthesizer>";

    private string binauralTest = "<CsoundSynthesizer>\n<CsOptions>\n-odac\n</CsOptions>\n<CsInstruments>\nsr = 44100\nksmps = 32\nnchnls = 2\n0dbfs = 1\ngiSine         ftgen       0, 0, 2^12, 10, 1             \n; sine wave\ngiLFOShape     ftgen       0, 0, 131072, 19, 0.5,1,180,1 ; U-shape parabola\\\ngS_HRTF_left   =           \"hrtf-44100-left.dat\"\ngS_HRTF_right  =           \"hrtf-44100-right.dat\"\n\n  instr 1\n; create an audio signal (noise impulses)\nkrate          oscil       30,0.2,giLFOShape            ; rate of impulses\n; amplitude envelope: a repeating pulse\nkEnv           loopseg     krate+3,0, 0,1, 0.05,0, 0.95,0,0\naSig           pinkish     kEnv                             ; noise pulses\n\n; -- apply binaural 3d processing --\n; azimuth (direction in the horizontal plane)\nkAz chnget \"azimuth\" ;kAz            linseg      0, 8, 360\n; elevation (held horizontal for 8 seconds then up, then down, then horizontal\nkElev chnget \"elevation\" ;kElev          linseg      0, 8,   0, 4, 90, 8, -40, 4, 0\n\nkRoll chnget \"rolloff\"\n\n; apply hrtfmove2 opcode to audio source - create stereo ouput\naLeft, aRight  hrtfmove2   aSig, kAz, kElev, gS_HRTF_left, gS_HRTF_right\n               outs        aLeft * kRoll, aRight * kRoll            ; audio to outputs\n ;printk 0.1, kRoll\nendin\n\n</CsInstruments>\n<CsScore>\ni 1 0 z ; instr 1 plays forever\n</CsScore>\n</CsoundSynthesizer>\n;example by Iain McCurdy\n\n";//"<CsoundSynthesizer>\n<CsOptions>\n-odac\n</CsOptions>\n<CsInstruments>\nsr = 44100\nksmps = 32\nnchnls = 2\n0dbfs = 1\n\ngiSine         ftgen       0, 0, 2^12, 10, 1             ; sine wave\ngiLFOShape     ftgen       0, 0, 131072, 19, 0.5,1,180,1 ; U-shape parabola\n\ngS_HRTF_left   =           \"hrtf-44100-left.dat\"\ngS_HRTF_right  =           \"hrtf-44100-right.dat\"\n\n  instr 1\n; create an audio signal (noise impulses)\nkrate          oscil       30,0.2,giLFOShape            ; rate of impulses\n; amplitude envelope: a repeating pulse\nkEnv           loopseg     krate+3,0, 0,1, 0.05,0, 0.95,0,0\naSig           pinkish     kEnv                             ; noise pulses\n\n; -- apply binaural 3d processing --\n; azimuth (direction in the horizontal plane)\nkAz chnget \"azimuth\" ;kAz            linseg      0, 8, 360\n; elevation (held horizontal for 8 seconds then up, then down, then horizontal\nkElev chnget \"elevation\" ;kElev          linseg      0, 8,   0, 4, 90, 8, -40, 4, 0\n; apply hrtfmove2 opcode to audio source - create stereo ouput\naLeft, aRight  hrtfmove2   aSig, kAz, kElev, gS_HRTF_left, gS_HRTF_right\n               outs        aLeft, aRight             ; audio to outputs\n printk 0.1, chnget(\"rolloff\")\nendin\n\n</CsInstruments>\n<CsScore>\ni 1 0 z ; instr 1 plays forever\n</CsScore>\n</CsoundSynthesizer>\n;example by Iain McCurdy";
    
    private string binauralTest2 = "<CsoundSynthesizer>\n<CsOptions>\n; Select flags here\n; realtime audio out \n -o dac \n; For Non-realtime ouput leave only the line below:\n; -o hrtf.wav\n</CsOptions>\n<CsInstruments>\n\nsr = 44100\nkr = 4410\nksmps = 10\nnchnls = 2\n\ngasrc init 0\n\ninstr 1\t\t;a plucked string\n\n  kamp = p4\n  kcps = cpspch(p5)\n  icps = cpspch(p5)\n\n  a1 pluck kamp, kcps, icps, 0, 1\n\n  gasrc = a1\n\nendin\n\ninstr 10\t;uses output from instr1 as source\n\n kaz\tlinseg 0, p3, 720\t\t;2 full rotations\n\n aleft,aright hrtfmove2 gasrc, kaz,0, \"hrtf-44100-left.dat\",\"hrtf-44100-right.dat\"\n\n outs\taleft, aright\n\nendin\n\n</CsInstruments>\n<CsScore>\n\n; Play Instrument 1: a simple arpeggio\ni1 0 .2 15000 8.00 \ni1 + .2 15000 8.04\ni1 + .2 15000 8.07\ni1 + .2 15000 8.11\ni1 + .2 15000 9.02\ni1 + 1.5 15000 8.11\ni1 + 1.5 15000 8.07\ni1 + 1.5 15000 8.04\ni1 + 1.5 15000 8.00\ni1 + 1.5 15000 7.09\ni1 + 1.5 15000 8.00\n\n; Play Instrument 10 for 10 seconds.\ni10 0 10\n\n</CsScore>\n</CsoundSynthesizer>";

    // callbacks have to be static!
    // IL2CPP does not support marshaling delegates that point to instance methods to native code.
    [AOT.MonoPInvokeCallback(typeof(CsoundInitializeCallback))]
    private static void OnCsoundInitialized(int instanceId)
    {
        //var envPath = $"--env:SADIR+={Application.streamingAssetsPath}/samples/";
        //Debug.Log("Setting Env path to: " + envPath);
        //csoundSetOption(instanceId, envPath, Marshal.GetFunctionPointerForDelegate((CsoundSetOptionCallback)OnCsoundSetOption).ToInt32());
        //Debug.Log("csoundSetOption res: " + res);
        //this._instanceId = instanceId;
        if (_instances.Contains(instanceId))
        {
            Debug.LogError("Csound initialization error! There are two Csound instances with the same id!");
            return;
        }

        _instances.Add(instanceId);
        //_initialized = true;
        Debug.Log("csoundInitialize result from C#: " + instanceId );
        //csoundSetOption(0, $"--env:SADIR+={Application.streamingAssetsPath}/samples");
    }

    [AOT.MonoPInvokeCallback(typeof(CsoundInitializeCallback))]
    private static void OnCsoundStopped(int instanceId)
    {
        Debug.Log($"csound instance {instanceId} stopped and cleaned");
    }

    [AOT.MonoPInvokeCallback(typeof(Action<int, IntPtr>))]
    private static void OnCsoundGetTable(int instanceId, int len, IntPtr ptr)
    {
        var arr = new double[len];
        Marshal.Copy(ptr, arr, 0, len);
        Debug.Log($"OnCsoundGetTable len:{len} > {arr[0]}, {arr[1]}, {arr[2]}");
    }

    [AOT.MonoPInvokeCallback(typeof(CsoundSetOptionCallback))]
    private static void OnCsoundSetOption(int instanceId, int res)
    {
        Debug.Log($"OnCsoundSetOption res: {res}");
        //_initialized = true;
    }

    private static AudioListener _activeAudioListener;
    public static AudioListener activeAudioListener
    {
        get
        {
            if (!_activeAudioListener
                || !_activeAudioListener.isActiveAndEnabled)
            {
                var audioListeners = FindObjectsOfType<AudioListener>(false);
                _activeAudioListener = Array.Find(audioListeners, audioListener => audioListener.enabled); 
            }
    
            return _activeAudioListener;
        }
    }

    // Start is called before the first frame update
    void Start()
    {
        _introText.SetActive(true);
        _infoContainer.SetActive(false);
        _infoContainer.GetComponentInChildren<Button>().onClick.AddListener(InitializeCsoundInstance);
        
        _audioSource = GetComponent<AudioSource>();
        //Debug.Log("Calling csoundInitialize");
        //csoundInitialize(0);
    }

    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            if (!_audioContextUnlocked)
            {
                _audioContextUnlocked = true;
                _introText.SetActive(false);
                _infoContainer.SetActive(true);
            }
            // else 
            // {
            //     Debug.Log("Calling csoundTest");
            //     InitializeCsoundInstance();
            //     //csoundTest(0);
            // }
        }

        if (!_instances.Contains(0))
        {
            // yet no csound instance has been initialized
            return;
        }

        // if (Input.GetMouseButtonDown(0))    
        // {
        //     //csoundGetTable(0, 1, Marshal.GetFunctionPointerForDelegate((CsoundGetTableCallback)OnCsoundGetTable));
        //     // wait until the first instance is available
        //     if (_instances.Contains(0))
        //     {
        //         //csoundSetChannel(0, "freq", Input.mousePosition.x / Screen.width * 2000);
        //         csoundInputMessage(0, "i 1 0 24");
        //     }            
        // }

        // Calculate distance between the AudioListener and the AudioSource
        float distance = Vector3.Distance(activeAudioListener.transform.position, transform.position);

        // Get the vector from the AudioListener to the AudioSource
        Vector3 direction = transform.position - activeAudioListener.transform.position;

        // Calculate the local direction vector relative to the AudioListener
        Vector3 localDirection = activeAudioListener.transform.InverseTransformDirection(direction);

        // Calculate the azimuth
        float azimuth = Mathf.Atan2(localDirection.x, localDirection.z) * Mathf.Rad2Deg;
        if (azimuth < 0) azimuth += 360; // Ensure azimuth is in the range [0, 360]

        // Calculate the elevation
        float elevation = Mathf.Atan2(localDirection.y, new Vector2(localDirection.x, localDirection.z).magnitude) * Mathf.Rad2Deg;

        //Debug.Log($"Distance: {distance}, Azimuth: {azimuth}, Elevation: {elevation}");
        var rolloffCurve = _audioSource.GetCustomCurve(AudioSourceCurveType.CustomRolloff);
        var normalized = (distance / (_audioSource.maxDistance - _audioSource.minDistance));
        normalized = Mathf.Clamp01(normalized);
        var rolloff = rolloffCurve.Evaluate(normalized);
        //Debug.Log($"distance: {distance}, normalized: {normalized} rolloff: {rolloff}");
    
        csoundSetChannel(0, "rolloff", rolloff);
        csoundSetChannel(0, "azimuth", azimuth);
        csoundSetChannel(0, "elevation", elevation);
        
    }

    private void InitializeCsoundInstance()
    {
        //csoundInitialize(0, keepAliveTest, Marshal.GetFunctionPointerForDelegate((CsoundInitializeCallback)OnCsoundInitialized).ToInt32());
        //csoundInitialize(0, microphoneTest, Marshal.GetFunctionPointerForDelegate((CsoundInitializeCallback)OnCsoundInitialized).ToInt32());
        // Csound won't be able to read from the streaming assets path because it has to be accessed with WebRequests.
        //var envPath = $"--env:SADIR+={Application.streamingAssetsPath}/samples/"; This won't work
        // We will pass a list of the files to be loaded, with relative paths and a separator (':' in this case), like:
        var filesToLoad = "./StreamingAssets/samples/hrtf-44100-left.dat:./StreamingAssets/samples/hrtf-44100-right.dat";
        // 
        csoundInitialize(3, binauralTest, filesToLoad, Marshal.GetFunctionPointerForDelegate((CsoundInitializeCallback)OnCsoundInitialized).ToInt32());
    }

    private void StopCsoundInstance(int instanceId) 
    {
        csoundStop(instanceId, Marshal.GetFunctionPointerForDelegate((CsoundStopCallback)OnCsoundStopped).ToInt32());
    }
#endif
}
