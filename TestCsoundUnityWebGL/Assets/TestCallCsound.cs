using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
public class TestCallCsound : MonoBehaviour
{
#if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void csoundInitialize(int flags, string csdText, int callback);
    
    [DllImport("__Internal")]
    private static extern void csoundTest(int flags);

    [DllImport("__Internal")]
    private static extern void csoundSetChannel(int instanceId, string channel, float value);

    // Define the callback delegate type
    private delegate void CsoundInitializeCallback(int instanceId);
    private static bool _initialized;

    // callbacks have to be static!
    // IL2CPP does not support marshaling delegates that point to instance methods to native code.
    [AOT.MonoPInvokeCallback(typeof(CsoundInitializeCallback))]
    private static void OnCsoundInitialized(int instanceId)
    {
        _initialized = true;
        Debug.Log("csoundInitialize result from C#: " + instanceId);
    }

    string keepAliveTest = "\n      <CsoundSynthesizer>\n      <CsOptions>\n          -odac\n      </CsOptions>\n      <CsInstruments>\n          0dbfs = 1\n      \n          chnset(440, \"freq\")\n      \n          instr 1\n          out poscil(0dbfs/3, chnget:k(\"freq\")) * linen:a(1, .01, p3, .01)\n          endin\n      </CsInstruments>\n      <CsScore>\n          i 1 0 z\n      </CsScore>\n      </CsoundSynthesizer>\n      ";

    // Start is called before the first frame update
    void Start()
    {
        
        //Debug.Log("Calling csoundInitialize");
        //csoundInitialize(0);
    }

    void Update()
    {
        if (Input.GetMouseButtonDown(0))
        {
            Debug.Log("Calling csoundTest");
            //csoundTest(0);
            csoundInitialize(0, keepAliveTest, Marshal.GetFunctionPointerForDelegate((CsoundInitializeCallback)OnCsoundInitialized).ToInt32());
            //Debug.Log("csoundInitialize result from C#: " + res);
        }
        if (_initialized)    
        {
            csoundSetChannel(0, "freq", Input.mousePosition.x / Screen.width * 2000);
        }
    }
#endif
}


/*

using System.Runtime.InteropServices;
using UnityEngine;
using UnityEngine.UI;

public class MetaMaskConnector : MonoBehaviour
{
    [DllImport("__Internal")]
    private static extern void GetMetaMaskWallet(int callback);

    public Button connectMetaMaskButton;

    void Start()
    {
        // 'Connect with MetaMask button'
        Button btn = connectMetaMaskButton.GetComponent<Button>();
        btn.onClick.AddListener(ConnectWallet);
    }

    void ConnectWallet()
    {
        GetMetaMaskWallet(Marshal.GetFunctionPointerForDelegate((MetaMaskCallback)OnMetaMaskConnected).ToInt32());
    }

    [AOT.MonoPInvokeCallback(typeof(MetaMaskCallback))]
    private void OnMetaMaskConnected(string account)
    {
        if (account != "")
        {
            connectMetaMaskButton.gameObject.SetActive(false);
        }
    }

    // Define the callback delegate type
    private delegate void MetaMaskCallback(string account);
}

*/