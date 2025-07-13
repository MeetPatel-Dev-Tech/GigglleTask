import {
  Camera,
  CameraType,
  CameraView,
  useCameraPermissions,
} from "expo-camera";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function RecordScreen() {
  // 1. Call hooks at the very top, no early returns here
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [microphonePermission, setMicrophonePermission] = useState<
    boolean | null
  >(null);

  const [facing, setFacing] = useState<CameraType>("back");
  const [recording, setRecording] = useState(false);
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const microphoneStatus = await Camera.getMicrophonePermissionsAsync();
      if (microphoneStatus.status === "granted") {
        setMicrophonePermission(true);
      } else {
        const requestStatus = await Camera.requestMicrophonePermissionsAsync();
        setMicrophonePermission(requestStatus.status === "granted");
      }
    })();
  }, []);

  // 2. Conditional rendering happens here inside return
  if (!cameraPermission?.granted) {
    return (
      <View style={styles.container}>
        <Text>Camera access required.</Text>
        <TouchableOpacity
          onPress={requestCameraPermission}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Grant Camera Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (microphonePermission === false) {
    return (
      <View style={styles.container}>
        <Text>Microphone access required.</Text>
        <TouchableOpacity
          onPress={async () => {
            const requestStatus =
              await Camera.requestMicrophonePermissionsAsync();
            setMicrophonePermission(requestStatus.status === "granted");
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Grant Microphone Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (microphonePermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting microphone permission...</Text>
      </View>
    );
  }

  // recording promise to await stop
  const recordingPromiseRef = useRef<Promise<any> | null>(null);

  const handleStartRecording = async () => {
    if (!cameraRef.current || recording) return;

    setRecording(true);
    try {
      recordingPromiseRef.current = cameraRef.current.recordAsync();
    } catch (error) {
      console.error("Error starting recording", error);
      setRecording(false);
    }
  };

  const handleStopRecording = async () => {
    if (!cameraRef.current || !recording) return;

    cameraRef.current.stopRecording();

    try {
      const video = await recordingPromiseRef.current;
      setRecording(false);

      if (video && video.uri) {
        router.push({ pathname: "/preview", params: { uri: video.uri } });
      } else {
        console.error("Video recording failed or returned undefined.");
      }
    } catch (error) {
      console.error("Error stopping recording", error);
      setRecording(false);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <CameraView style={{ flex: 1 }} facing={facing} ref={cameraRef} />
      <View style={styles.controls}>
        {!recording ? (
          <TouchableOpacity
            onPress={handleStartRecording}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Start Recording</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={handleStopRecording}
            style={[styles.button, { backgroundColor: "red" }]}
          >
            <Text style={styles.buttonText}>Stop Recording</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  controls: {
    position: "absolute",
    bottom: 20,
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "tomato",
    padding: 12,
    borderRadius: 10,
    minWidth: 180,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "bold" },
});
