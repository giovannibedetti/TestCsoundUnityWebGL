using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System.Runtime.InteropServices;
public class TestCallCsound : MonoBehaviour
{
    #if UNITY_WEBGL && !UNITY_EDITOR
    [DllImport("__Internal")]
    private static extern void csoundInitialize(int flags);
    // Start is called before the first frame update
    void Start()
    {
        Debug.Log("Calling csoundInitialize");
        csoundInitialize(0);
    }

    // Update is called once per frame
    void Update()
    {
        
    }
    #endif
}
