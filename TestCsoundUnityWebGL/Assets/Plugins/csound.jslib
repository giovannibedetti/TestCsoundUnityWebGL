
mergeInto(LibraryManager.library, {

    csoundInitialize: function(flags) {
        window.alert("csoundInitialize");
        Csound.csoundInitialize(flags);
    },
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