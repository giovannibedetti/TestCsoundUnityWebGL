using UnityEngine;
using System.Runtime.InteropServices;
using UnityEngine.UI;

public class TestCallCsound : MonoBehaviour
{
    [SerializeField] 
    private GameObject _introText;
    [SerializeField] 
    private GameObject _infoContainer;

#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void csoundInitialize(int variation, string csdText, int callback);
    
    [DllImport("__Internal")]
    private static extern void csoundTest(int variation);

    [DllImport("__Internal")]
    private static extern void csoundSetChannel(int instanceId, string channel, float value);

    // Define the callback delegate type
    private delegate void CsoundInitializeCallback(int instanceId);

    private static bool _clicked;
    private static bool _initialized;
    private string keepAliveTest = "\n      <CsoundSynthesizer>\n      <CsOptions>\n          -odac\n      </CsOptions>\n      <CsInstruments>\n          0dbfs = 1\n      \n          chnset(440, \"freq\")\n      \n          instr 1\n          out poscil(0dbfs/3, chnget:k(\"freq\")) * linen:a(1, .01, p3, .01)\n          endin\n      </CsInstruments>\n      <CsScore>\n          i 1 0 z\n      </CsScore>\n      </CsoundSynthesizer>\n      ";

    // callbacks have to be static!
    // IL2CPP does not support marshaling delegates that point to instance methods to native code.
    [AOT.MonoPInvokeCallback(typeof(CsoundInitializeCallback))]
    private static void OnCsoundInitialized(int instanceId)
    {
        _initialized = true;
        Debug.Log("csoundInitialize result from C#: " + instanceId);
    }

    // Start is called before the first frame update
    void Start()
    {
        _introText.SetActive(true);
        _infoContainer.SetActive(false);
        _infoContainer.GetComponentInChildren<Button>().onClick.AddListener(InitializeCsoundInstance);
        //Debug.Log("Calling csoundInitialize");
        //csoundInitialize(0);
    }

    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            if (!_clicked)
            {
                _clicked = true;
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
        if (_initialized)    
        {
            csoundSetChannel(0, "freq", Input.mousePosition.x / Screen.width * 2000);
        }
    }

    private void InitializeCsoundInstance()
    {
        csoundInitialize(0, keepAliveTest, Marshal.GetFunctionPointerForDelegate((CsoundInitializeCallback)OnCsoundInitialized).ToInt32());
    }
#endif
}
