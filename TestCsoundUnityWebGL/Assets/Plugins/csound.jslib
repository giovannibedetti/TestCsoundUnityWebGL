var csoundModule = {

    $CsoundRef: {
        uniqueIdCounter: 0,
        instances: {}
    },

    $CsoundVariations: {

    },
    //const csoundInstances = {};
    // Counter for unique ID generation
    //const uniqueIdCounter = 0;

    csoundTest: async function (flags) {
        //window.alert("csoundTest");


        const csoundVariations = [
            { useWorker: false, useSPN: false, name: "SINGLE THREAD, AW" },
            { useWorker: false, useSPN: true, name: "SINGLE THREAD, SPN" },
            { useWorker: true, useSAB: true, name: "WORKER, AW, SAB" },
            { useWorker: true, useSAB: false, name: "WORKER, AW, Messageport" },
            { useWorker: true, useSAB: false, useSPN: true, name: "WORKER, SPN, MessagePort" },
        ];

        const helloWorld = `
      <CsoundSynthesizer>
      <CsOptions>
          -odac
      </CsOptions>
      <CsInstruments>
          instr 1
          prints "Hello World!\\n"
          endin
      </CsInstruments>
      <CsScore>
          i 1 0 0
      </CsScore>
      </CsoundSynthesizer>
      `;

        const shortTone = `
      <CsoundSynthesizer>
      <CsOptions>
          -odac
      </CsOptions>
      <CsInstruments>
      
          chnset(1, "test1")
          chnset(2, "test2")
      
          instr 1
          out poscil(0dbfs/3, 440) * linen:a(1, .01, p3, .01)
          endin
      </CsInstruments>
      <CsScore>
          i 1 0 2
      </CsScore>
      </CsoundSynthesizer>
      `;

        const shortTone2 = `
      <CsoundSynthesizer>
      <CsOptions>
          -odac
      </CsOptions>
      <CsInstruments>
          0dbfs = 1
      
          chnset(440, "freq")
      
          instr 1
          out poscil(0dbfs/3, chnget:k("freq")) * linen:a(1, .01, p3, .01)
          endin
      </CsInstruments>
      <CsScore>
          i 1 0 1
      </CsScore>
      </CsoundSynthesizer>
      `;

        const keepAliveTest = `
      <CsoundSynthesizer>
      <CsOptions>
          -odac
      </CsOptions>
      <CsInstruments>
          0dbfs = 1
      
          chnset(440, "freq")
      
          instr 1
          out poscil(0dbfs/3, chnget:k("freq")) * linen:a(1, .01, p3, .01)
          endin
      </CsInstruments>
      <CsScore>
          i 1 0 z
      </CsScore>
      </CsoundSynthesizer>
      `;

        const stringChannelTest = `
      <CsoundSynthesizer>
      <CsOptions>
          -odac
      </CsOptions>
      <CsInstruments>
          0dbfs = 1
      
          instr 1
            chnset("test0", "strChannel")
            turnoff
          endin
      
      </CsInstruments>
      <CsScore>
          i 1 0 2
          e 2 0
      </CsScore>
      </CsoundSynthesizer>
      `;

        const pluginTest = `
      <CsoundSynthesizer>
      <CsOptions>
       -odac
      </CsOptions>
      <CsInstruments>
        0dbfs=1
        instr 1
          i1 = 2
          i2 = 2
          i3 mult i1, i2
          print i3
        endin
        instr 2
          k1 = 2
          k2 = 2
          k3 mult k1, k2
          printk2 k3
        endin
        instr 3
          a1 oscili 0dbfs, 440
          a2 oscili 0dbfs, 356
          a3 mult a1, a2
          out a3
        endin
      </CsInstruments>
      <CsScore>
        i1 0 0
        i2 0 1
        i3 0 2
        e 0 0
      </CsScore>
      </CsoundSynthesizer>
      `;

        const cxxPluginTest = `
      <CsoundSynthesizer>
      <CsOptions>
       -odac
      </CsOptions>
      <CsInstruments>
        0dbfs=1
      instr 1
       kcone_lengths[] fillarray 0.0316, 0.051, .3, 0.2
       kradii_in[] fillarray 0.0055, 0.00635, 0.0075, 0.0075
       kradii_out[]  fillarray 0.0055, 0.0075, 0.0075, 0.0275
       kcurve_type[] fillarray 1, 1, 1, 2
       kLength linseg 0.2, 2, 0.3
       kPick_Pos = 1.0
       kEndReflection init 1.0
       kEndReflection = 1.0
       kDensity = 1.0
       kComputeVisco = 0
       aImpulse mpulse .5, .1
       aFeedback, aSound resontube 0.005*aImpulse, kLength, kcone_lengths, kradii_in, kradii_out, kcurve_type, kEndReflection, kDensity, kPick_Pos, kComputeVisco
       out aSound
      endin
      </CsInstruments>
      <CsScore>
      i1 0 2
      </CsScore>
      </CsoundSynthesizer>
      `;

        const ftableTest = `
      <CsoundSynthesizer>
      <CsOptions>
          -odac
      </CsOptions>
      <CsInstruments>
          instr 1
          prints "Hello Fibonnaci!\\n"
          prints "Table length %d\\n", tableng:i(1)
          endin
      </CsInstruments>
      <CsScore>
          f 1 0 8 -2 0 1 1 2 3 5 8 13
          i 1 0 -1
      </CsScore>
      </CsoundSynthesizer>
      `;

        const samplesTest = `
      <CsoundSynthesizer>
      <CsOptions>
      -odac
      </CsOptions>
      <CsInstruments>
      sr = 44100
      ksmps = 32
      nchnls = 1
      0dbfs = 1
      
      instr 1
       Ssample = "tiny_test_sample.wav"
       aRead[] diskin Ssample, 1, 0, 0
       out aRead[0], aRead[0]
      endin
      
      instr 2
        aSig monitor
        fout "monitor_out.wav", 4, aSig
      endin
      
      </CsInstruments>
      <CsScore>
      i 2 0 0.3
      i 1 0 0.1
      i 1 + .
      i 1 + .
      e
      </CsScore>
      </CsoundSynthesizer>
      `;

        const delay = ms => new Promise(res => setTimeout(res, ms));

        function timeout(ms, errorMessage = 'Operation timed out') {
            return new Promise((_, reject) =>
                setTimeout(() => reject(new Error(errorMessage)), ms)
            );
        }

        function useTimeout(promise, ms) {
            return Promise.race([
                promise,
                timeout(ms)
            ]);
        }

        var variation = csoundVariations[flags];

        async function startStopTest(variation) {
            var msgOutput = "";
            var t0 = performance.now();


            const msg = "can be started:";
            const cs = await Csound(variation);
            var t1 = performance.now();
            console.log(`Csound version: ${cs.name}, ${cs}`);
            const test = await cs.start();
            var t2 = performance.now();
            useTimeout(test, 2000)
                .then(() => {
                    var t3 = performance.now();
                    console.log(`Start stop test completed in ${t3 - t0} milliseconds
                        \nt0: ${t0}\nt1: ${t1}\nt2: ${t2}\nt3: ${t3}\n`);
                    console.log(test == 0 ? `${msg} ok` : `${msg} failed`);

                })
                .catch(error => {
                    var t3 = performance.now();
                    console.error('Error:', error.message);
                    console.log(`Start stop test timed out in ${t3 - t0} milliseconds
                        \nt0: ${t0}\nt1: ${t1}\nt2: ${t2}\nt3: ${t3}\n`);
                });

            //console.log(test == 0 ? `${msg} ok` : `${msg} failed`);
            //await cs.stop();
            //await cs.destroy();
            //await cs.terminateInstance();
        };

        async function expectedMethodsTest(variation) {
            const msg = "has expected methods:";
            const cs = await Csound(variation);
            const audioContext = typeof cs.getAudioContext !== "function"; // or instead -> // cs.getAudioContext() !== undefined
            const start = typeof cs.start !== "function";
            const stop = typeof cs.stop !== "function";
            const pause = typeof cs.pause !== "function";
            var test = audioContext && start && stop && pause
            console.log(test == 0 ? `${msg} ok` : `${msg} failed`);
            // useTimeout(cs, 2000)
            //     .then(() => {
            //         console.log(test == 0 ? `${msg} ok` : `${msg} failed`);
            //     })
            //     .catch(error => {
            //         console.error('Error:', error.message);
            //     });
            //await cs.start();
            //await cs.stop();
            //await cs.destroy();
            //await cs.terminateInstance();
        };

        async function canRunCompileOrc(variation) {
            const msg = "can use run using just compileOrc:";
            const cs = await Csound(variation);
            await cs.compileOrc(`
                ksmps=64
                instr 1
                out oscili(.25, 110)
                endin
                schedule(1,0,1)
            `);
            const test = await cs.start();
            useTimeout(test, 2000)
                .then(() => {
                    console.log(test == 0 ? `${msg} ok` : `${msg} failed`);
                })
                .catch(error => {
                    console.error('Error:', error.message);
                });
            //console.log(test == 0 ? `${msg} ok` : `${msg} failed`);
            //await cs.stop();
            //await cs.terminateInstance();
        };

        async function canPlayTone(variation) {
            const msg = "can play tone and get channel values:";
            var t0 = performance.now();
            const cs = await Csound(variation);
            var t1 = performance.now();
            const compileReturn = await cs.compileCsdText(shortTone);
            var t2 = performance.now();
            const startTest = await cs.start();
            var t3 = performance.now();
            const getChan1 = await cs.getControlChannel("test1");
            var t4 = performance.now();
            const getChan2 = await cs.getControlChannel("test2");
            var t5 = performance.now();
            console.log(`startTest: ${startTest} getChan1: ${getChan1} getChan2: ${getChan2}`)
            const test = (startTest == 0) && (getChan1 == 1) && (getChan2 == 2);
            console.log(`test: ${test}`)
            console.log(`Play tone test completed in ${t5 - t0} milliseconds
                \nt0: ${t0}\nt1: ${t1}(${t1 - t0}ms)\nt2: ${t2}(${t2 - t1}ms)\nt3: ${t3}(${t3 - t2}ms)\nt4: ${t4}(${t4 - t3}ms)\nt5: ${t5}(${t5 - t4}ms)\n`);

            // useTimeout(test, 2000)
            //     .then(() => {
            //         console.log(`Play tone test completed in ${t5 - t0} milliseconds
            //             \nt0: ${t0}\nt1: ${t1}\nt2: ${t2}\nt3: ${t3}\nt4: ${t4}\nt5: ${t5}\n`);    
            //         console.log(test == 0 ? `${msg} ok` : `${msg} failed`);
            //     })
            //     .catch(error => {
            //         console.log(`Play tone test timed out in ${t5 - t0} milliseconds
            //             \nt0: ${t0}\nt1: ${t1}\nt2: ${t2}\nt3: ${t3}\nt4: ${t4}\nt5: ${t5}\n`);
            //         console.error('Error:', error.message);
            //     });
            //console.log(test == 0 ? `${msg} ok` : `${msg} failed`);
            // await cs.perform();
            // await cs.terminateInstance();
        };

        async function canStayAlive(variation) {
            const msg = "Can be kept alive and stopped after a 5s timeout";
            var t0 = performance.now();
            const cs = await Csound(variation);
            var t1 = performance.now();
            const compileReturn = await cs.compileCsdText(keepAliveTest);
            var t2 = performance.now();
            const startTest = await cs.start();
            var t3 = performance.now();
            await delay(5000);
            var t4 = performance.now();
            const stopTest = await cs.stop()
            var t5 = performance.now();

            //console.log(`${compileReturn} ${startTest} ${stopTest}`)
            console.log((compileReturn == 0 && startTest == 0 && stopTest == undefined) ? `----->>> [TEST OK]: ${msg} completed in ${t5 - t0}ms` : `----->>> [TEST FAILED]:${msg} failed in ${t5 - t0}ms`);
        }

        //await startStopTest(variation);
        // await expectedMethodsTest(variation);
        // await canRunCompileOrc(variation);
        //await canPlayTone(variation);
        await canStayAlive(variation);
    },

    csoundInitialize: async function (flags, csdTextPtr, callback) {
        //window.alert("csoundInitialize");

        const csoundVariations = [
            { useWorker: false, useSPN: false, name: "SINGLE THREAD, AW" },
            { useWorker: false, useSPN: true, name: "SINGLE THREAD, SPN" },
            { useWorker: true, useSAB: true, name: "WORKER, AW, SAB" },
            { useWorker: true, useSAB: false, name: "WORKER, AW, Messageport" },
            { useWorker: true, useSAB: false, useSPN: true, name: "WORKER, SPN, MessagePort" },
        ];

        variation = csoundVariations[flags]
        csdText = UTF8ToString(csdTextPtr)

        console.log("starting to await for Csound with flag: " + flags)
        const cs = await Csound(variation);
        console.log(`Csound version: ${cs.name}`);
        const compileReturn = await cs.compileCsdText(csdText);
        const startReturn = await cs.start();
        console.log(startReturn);
        CsoundRef.instances[CsoundRef.uniqueIdCounter] = cs;
        var uniqueId = CsoundRef.uniqueIdCounter;
        CsoundRef.uniqueIdCounter++;
        console.log(`uniqueId: ${uniqueId}, CsoundRef.uniqueIdCounter: ${CsoundRef.uniqueIdCounter}`);
        Module['dynCall_vi'](callback, [uniqueId]);
        //cs.terminateInstance && (await cs.terminateInstance());
    },

    csoundGetInstance: function (uniqueId) {
        return CsoundRef.instances[uniqueId];
    },

    csoundGetChannel: async function (uniqueId, channelPtr) {
        return CsoundRef.instances[uniqueId].getControlChannel(UTF8ToString(channel));
    },

    csoundSetChannel: async function (uniqueId, channelPtr, value) {
        CsoundRef.instances[uniqueId].setControlChannel(UTF8ToString(channelPtr), value);
    }


    // Expose functions using object literal
    // return {
    //     csoundTest,
    //     //uniqueIdCounter,
    //     csoundInitialize,
    //     //csoundGetInstance,
    //     //csoundGetChannel,
    //     //csoundSetChannel
    // };
}//)();

autoAddDeps(csoundModule, '$CsoundRef');
mergeInto(LibraryManager.library, csoundModule);

/*
mergeInto(LibraryManager.library, {

     csoundCreate: function(hostdata) {
        window.alert("csoundCreate");
        Csound.csoundCreate(hostdata);
    },
    csoundLoadPlugins: function(csound, dir) {
        window.alert("csoundLoadPlugins");
        Csound.csoundLoadPlugins(csound, dir);
    },
    csoundDestroy: function(csound) {
        window.alert("csoundDestroy");
        Csound.csoundDestroy(csound);
    },
    csoundGetVersion: function() {
        window.alert("csoundGetVersion");
        Csound.csoundGetVersion();
    },
    csoundGetAPIVersion: function() {
        window.alert("csoundGetAPIVersion");
        Csound.csoundGetAPIVersion();
    },
    csoundParseOrc: function(csound, str) {
        window.alert("csoundParseOrc");
        Csound.csoundParseOrc(csound, str);
    },
    csoundCompileTree: function(csound, root) {
        window.alert("csoundCompileTree");
        Csound.csoundCompileTree(csound, root);
    },
    csoundDeleteTree: function(csound, root) {
        window.alert("csoundDeleteTree");
        Csound.csoundDeleteTree(csound, root);
    },
    csoundCompileOrc: function(csound, orchStr) {
        window.alert("csoundCompileOrc");
        Csound.csoundCompileOrc(csound, orchStr);
    },
    csoundEvalCode: function(csound, orchStr) {
        window.alert("csoundEvalCode");
        Csound.csoundEvalCode(csound, orchStr);
    },
    csoundCompileArgs: function(csound, argc, argv) {
        window.alert("csoundCompileArgs");
        Csound.csoundCompileArgs(csound, argc, argv);
    },
    csoundStart: function(csound) {
        window.alert("csoundStart");
        Csound.csoundStart(csound);
    },
    csoundCompile: function(csound, argc, argv) {
        window.alert("csoundCompile");
        Csound.csoundCompile(csound, argc, argv);
    },
    csoundCompileCsd: function(csound, csdFilename) {
        window.alert("csoundCompileCsd");
        Csound.csoundCompileCsd();
    },
    csoundCompileCsdText: function(csound, csdText) {
        window.alert("csoundCompileCsdText");
        Csound.csoundCompileCsdText(csound, csdText);
    },
    csoundPerform: function(csound) {
        window.alert("csoundPerform");
        Csound.csoundPerform(csound);
    },
    csoundPerformKsmps: function(csound) {
        window.alert("csoundPerformKsmps");
        Csound.csoundPerformKsmps(csound);
    },
    csoundPerformBuffer: function(csound) {
        window.alert("csoundPerformBuffer");
        Csound.csoundPerformBuffer(csound);
    },
    csoundStop: function(csound) {
        window.alert("csoundStop");
        Csound.csoundStop(csound);
    },
    csoundCleanup: function(csound) {
        window.alert("csoundCleanup");
        Csound.csoundCleanup(csound);
    },
    csoundReset: function(csound) {
        window.alert("csoundReset");
        Csound.csoundReset(csound);
    },
    csoundGetSr: function(csound) {
        window.alert("csoundGetSr");
        Csound.csoundGetSr(csound);
    },
    csoundGetKr: function() {
        window.alert("csoundGetKr");
        Csound.csoundGetKr();
    },
    csoundGetKsmps: function(csound) {
        window.alert("csoundGetKsmps");
        Csound.csoundGetKsmps(csound);
    },
    csoundGetNchnls: function(csound) {
        window.alert("csoundGetNchnls");
        Csound.csoundGetNchnls(csound);
    },
    csoundGetNchnlsInput: function(csound) {
        window.alert("csoundGetNchnlsInput");
        Csound.csoundGetNchnlsInput(csound);
    },
    csoundGet0dBFS: function(csound) {
        window.alert("csoundGet0dBFS");
        Csound.csoundGet0dBFS(csound);
    },
    csoundGetCurrentTimeSamples: function(csound) {
        window.alert("csoundGetCurrentTimeSamples");
        Csound.csoundGetCurrentTimeSamples(csound);
    },
    csoundGetSizeOfMYFLT: function() {
        window.alert("csoundGetSizeOfMYFLT");
        Csound.csoundGetSizeOfMYFLT();
    },
    csoundGetHostData: function(csound) {
        window.alert("csoundGetHostData");
        Csound.csoundGetHostData(csound);
    },
    csoundSetHostData: function(csound, hostData) {
        window.alert("csoundSetHostData");
        Csound.csoundSetHostData(csound, hostData);
    },
    csoundSetOption: function(csound, option) {
        window.alert("csoundSetOption");
        Csound.csoundSetOption(csound, option);
    },
    csoundGetParams: function(csound, parms) {
        window.alert("csoundGetParams");
        Csound.csoundGetParams(csound, parms);
    },
    csoundSetParams: function(csound, parm) {
        window.alert("csoundSetParams");
        Csound.csoundSetParams(csound, parm);
    },
    csoundGetDebug: function(csound) {
        window.alert("csoundGetDebug");
        Csound.csoundGetDebug(csound);
    },
    csoundSetDebug: function(csound, debug) {
        window.alert("csoundSetDebug");
        Csound.csoundSetDebug(csound, debug);
    },

//   #region General Input/Output

    csoundGetOutputName: function(csound) {
        window.alert("csoundGetOutputName");
        Csound.csoundGetOutputName(csound);
    },
    csoundSetOutput: function(csound, name, type, format) {
        window.alert("csoundSetOutput");
        Csound.csoundSetOutput(csound, name, type, format);
    },
    csoundSetInput: function(csound, name) {
        window.alert("csoundSetInput");
        Csound.csoundSetInput(csound, name);
    },
    csoundSetMIDIFileInput: function(csound, name) {
        window.alert("csoundSetMIDIFileInput");
        Csound.csoundSetMIDIFileInput(csound, name);
    },
    csoundSetMIDIFileOutput: function(csound, name) {
        window.alert("csoundSetMIDIFileOutput");
        Csound.csoundSetMIDIFileOutput(csound, name);
    },

 // #region Realtime Audio I/O

    csoundSetRTAudioModule: function(csound, module) {
        window.alert("csoundSetRTAudioModule");
        Csound.csoundSetRTAudioModule(csound, module);
    },
    csoundGetModule: function(csound, number, name, type) {
        window.alert("csoundGetModule");
        Csound.csoundGetModule(csound, number, name, type);
    },
    csoundGetInputBufferSize: function(csound) {
        window.alert("csoundGetInputBufferSize");
        Csound.csoundGetInputBufferSize(csound);
    },
    csoundGetOutputBufferSize: function(csound) {
        window.alert("csoundGetOutputBufferSize");
        Csound.csoundGetOutputBufferSize(csound);
    },
    csoundGetSpin: function(csound) {
        window.alert("csoundGetSpin");
        Csound.csoundGetSpin(csound);
    },
    csoundClearSpin: function(csound) {
        window.alert("csoundClearSpin");
        Csound.csoundClearSpin(csound);
    },
    csoundAddSpinSample: function(csound, frame, channel, sample) {
        window.alert("csoundAddSpinSample");
        Csound.csoundAddSpinSample(csound, frame, channel, sample);
    },
    csoundSetSpinSample: function(csound, frame, channel, value) {
        window.alert("csoundSetSpinSample");
        Csound.csoundSetSpinSample(csound, frame, channel, value);
    },
    csoundGetSpout: function(csound) {
        window.alert("csoundGetSpout");
        Csound.csoundGetSpout(csound);
    },
    csoundGetSpoutSample: function(csound, frame, channel) {
        window.alert("csoundGetSpoutSample");
        Csound.csoundGetSpoutSample(csound, frame, channel);
    },
    csoundSetHostImplementedAudioIO: function(csound, state, buffSize) {
        window.alert("csoundSetHostImplementedAudioIO");
        Csound.csoundSetHostImplementedAudioIO(csound, state, buffSize);
    },
    csoundGetAudioDevList: function(csound, list, isOutput) {
        window.alert("csoundGetAudioDevList");
        Csound.csoundGetAudioDevList(csound, list, isOutput);
    },

// #region Realtime Midi I/O

    csoundSetMIDIModule: function(csound, module) {
        window.alert("csoundSetMIDIModule");
        Csound.csoundSetMIDIModule(csound, module);
    },
    csoundGetMIDIDevList: function(csound, list, isOutput) {
        window.alert("csoundGetMIDIDevList");
        Csound.csoundGetMIDIDevList(csound, list, isOutput);
    },

// #region Score Handling

    csoundReadScore: function(csound, score) {
        window.alert("csoundReadScore");
        Csound.csoundReadScore(csound, score);
    },
    csoundGetScoreTime: function(csound) {
        window.alert("csoundGetScoreTime");
        Csound.csoundGetScoreTime(csound);
    },
    csoundIsScorePending: function(csound) {
        window.alert("csoundIsScorePending");
        Csound.csoundIsScorePending(csound);
    },
    csoundSetScorePending: function(csound, pending) {
        window.alert("csoundSetScorePending");
        Csound.csoundSetScorePending(sound, pending);
    },
    csoundGetScoreOffsetSeconds: function(csound) {
        window.alert("csoundGetScoreOffsetSeconds");
        Csound.csoundGetScoreOffsetSeconds(csound);
    },
    csoundSetScoreOffsetSeconds: function(csound, time) {
        window.alert("csoundSetScoreOffsetSeconds");
        Csound.csoundSetScoreOffsetSeconds(csound, time);
    },
    csoundRewindScore: function(csound) {
        window.alert("csoundRewindScore");
        Csound.csoundRewindScore();
    },
    csoundScoreSort: function(csound, inFile, outFile) {
        window.alert("csoundScoreSort");
        Csound.csoundScoreSort(csound, inFile, outFile);
    },
    csoundScoreExtract: function(csound, inFile, outFile, extractFile) {
        window.alert("csoundScoreExtract");
        Csound.csoundScoreExtract(csound, inFile, outFile, extractFile);
    },

// #region Messages and Text

    csoundSetDefaultMessageCallback: function(processMessage) {
        window.alert("csoundSetDefaultMessageCallback");
        Csound.csoundSetDefaultMessageCallback(processMessage);
    },
    csoundSetMessageCallback: function(csound, processMessage) {
        window.alert("csoundSetMessageCallback");
        Csound.csoundSetMessageCallback(csound, processMessage);
    },
    csoundGetMessageLevel: function(csound) {
        window.alert("csoundGetMessageLevel");
        Csound.csoundGetMessageLevel(csound);
    },
    csoundSetMessageLevel: function(csound, messageLevel) {
        window.alert("csoundSetMessageLevel");
        Csound.csoundSetMessageLevel(csound, messageLevel);
    },
    csoundCreateMessageBuffer: function(csound, toStdOut) {
        window.alert("csoundCreateMessageBuffer");
        Csound.csoundCreateMessageBuffer(csound, toStdOut);
    },
    csoundGetFirstMessage: function(csound) {
        window.alert("csoundGetFirstMessage");
        Csound.csoundGetFirstMessage(csound);
    },
    csoundPopFirstMessage: function(csound) {
        window.alert("csoundPopFirstMessage");
        Csound.csoundPopFirstMessage(csound);
    },
    csoundGetMessageCnt: function(csound) {
        window.alert("csoundGetMessageCnt");
        Csound.csoundGetMessageCnt(csound);
    },
    csoundDestroyMessageBuffer: function(csound) {
        window.alert("csoundDestroyMessageBuffer");
        Csound.csoundDestroyMessageBuffer(csound);
    },

// #region Channels, Control and Events

    csoundGetChannelPtr: function(csound, pChannel, name, flags) {
        window.alert("csoundGetChannelPtr");
        Csound.csoundGetChannelPtr(csound, pChannel, name, flags);
    },
    csoundListChannels: function(csound, ppChannels) {
        window.alert("csoundListChannels");
        Csound.csoundListChannels(csound, ppChannels);
    },
    csoundDeleteChannelList: function(csound, ppChannels) {
        window.alert("csoundDeleteChannelList");
        Csound.csoundDeleteChannelList(csound, ppChannels);
    },
    csoundGetControlChannel: function(csound, str, err) {
        window.alert("csoundGetControlChannel");
        Csound.csoundGetControlChannel(csound, str, err);
    },
    csoundSetControlChannel: function(csound, str, value) {
        window.alert("csoundSetControlChannel");
        Csound.csoundSetControlChannel(csound, str, value);
    },
    csoundGetAudioChannel: function(csound, name, samples) {
        window.alert("csoundGetAudioChannel");
        Csound.csoundGetAudioChannel(csound, name, samples);
    },
    csoundSetAudioChannel: function(csound, name, samples) {
        window.alert("csoundSetAudioChannel");
        Csound.csoundSetAudioChannel(csound, name, samples);
    },
    csoundSetStringChannel: function(csound, str, value) {
        window.alert("csoundSetStringChannel");
        Csound.csoundSetStringChannel(csound, str, value);
    },
    csoundInputMessage: function(csound, str) {
        window.alert("csoundInputMessage");
        Csound.csoundInputMessage(csound, str);
    },

//  #endregion Channels, Control and Events

    csoundTableLength: function(csound, table) {
        window.alert("csoundTableLength");
        Csound.csoundTableLength(csound, table);
    },
    csoundTableGet: function(csound, table, index) {
        window.alert("csoundTableGet");
        Csound.csoundTableGet(csound, table, index);
    },
    csoundTableSet: function(csound, table, index, value) {
        window.alert("csoundTableSet");
        Csound.csoundTableSet(csound, table, index, value);
    },
    csoundTableCopyOut: function(csound, table, dest) {
        window.alert("csoundTableCopyOut");
        Csound.csoundTableCopyOut(csound, table, dest);
    },
    csoundTableCopyOutAsync: function(csound, table, dest) {
        window.alert("csoundTableCopyOutAsync");
        Csound.csoundTableCopyOutAsync(csound, table, dest);
    },
    csoundTableCopyIn: function(csound, table, source) {
        window.alert("csoundTableCopyIn");
        Csound.csoundTableCopyIn(csound, table, source);
    },
    csoundTableCopyInAsync: function(csound, table, source) {
        window.alert("csoundTableCopyInAsync");
        Csound.csoundTableCopyInAsync(csound, table, source);
    },
    csoundGetTable: function(csound, tablePtr, index) {
        window.alert("csoundGetTable");
        Csound.csoundGetTable(csound, tablePtr, index);
    },
    csoundGetTableArgs: function(csound, argsPtr, index) {
        window.alert("csoundGetTableArgs");
        Csound.csoundGetTableArgs(csound, argsPtr, index);
    },
    csoundIsNamedGEN: function(csound, num) {
        window.alert("csoundIsNamedGEN");
        Csound.csoundIsNamedGEN(csound, num);
    },
    csoundGetNamedGEN: function(csound, num, name, len) {
        window.alert("csoundGetNamedGEN");
        Csound.csoundGetNamedGEN(csound, num, name, len);
    },

//    #region Opcodes

    csoundGetNamedGens: function(csound) {
        window.alert("csoundGetNamedGens");
        Csound.csoundGetNamedGens(csound);
    },
    csoundNewOpcodeList: function(csound, ppOpcodeList) {
        window.alert("csoundNewOpcodeList");
        Csound.csoundNewOpcodeList(csound, ppOpcodeList);
    },
    csoundDisposeOpcodeList: function(csound, ppOpcodeList) {
        window.alert("csoundDisposeOpcodeList");
        Csound.csoundDisposeOpcodeList(csound, ppOpcodeList);
    },
    csoundSetOpcodedir: function(opcodeDir) {
        //window.alert("csoundSetOpcodedir");
        //Csound.csoundSetOpcodedir(opcodeDir);
    },

// #region Threading and concurrency

    csoundSleep: function(milleseconds) {
        window.alert("csoundSleep");
        Csound.csoundSleep(milleseconds);
    },

// #region Miscellaneous functions

    csoundRunCommand: function(argv, nowait) {
        window.alert("csoundRunCommand");
        Csound.csoundRunCommand(argv, nowait);
    },
    csoundGetRandomSeedFromTime: function() {
        window.alert("csoundGetRandomSeedFromTime");
        Csound.csoundGetRandomSeedFromTime();
    },
    csoundGetEnv: function(csound, key) {
        window.alert("csoundGetEnv");
        Csound.csoundGetEnv(csound, key);
    },
    csoundSetGlobalEnv: function(name, value) {
        window.alert("csoundSetGlobalEnv");
        Csound.csoundSetGlobalEnv(name, value);
    },
    csoundListUtilities: function(csound) {
        window.alert("csoundListUtilities");
        Csound.csoundListUtilities(csound);
    },
    csoundDeleteUtilityList: function(csound, list) {
        window.alert("csoundDeleteUtilityList");
        Csound.csoundDeleteUtilityList(csound, list);
    },    
});
*/