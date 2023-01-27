import React,{useRef,useState} from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { Camera,CameraType } from "expo-camera";
import * as ImageManipulator from "expo-image-manipulator";

export default function CameraScreen() {
    const cameraRef = useRef(null);
    const [type, setType] = useState(CameraType.back);
    const [flash, setFlash] = useState('off');
    const [zoom, setZoom] = useState(0);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  function toggleCameraType() {
    setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
  }
  function toggleFlashMode(){
    setFlash(current => (current === 'off' ? 'on' : 'off'));
  }
  function toggleZoomMode(){
    setZoom(current => (current === 0 ? 0.50 : 0));
  }

  if (!permission) {
    return <View />;
  }
  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }
  return (<>
  <Camera style={styles.camera} ref={cameraRef} type={type} flashMode={flash} zoom={zoom}>
  <Button  title="Flip camera" onPress={toggleCameraType} />
  <Button  title={flash == 'off' ?"Activate Flash": "Disable Flash"} onPress={toggleFlashMode} />
  <Button  title="Zoom" onPress={toggleZoomMode} />
  </Camera>
  
  <Button style={styles.but} title="Take a picture" onPress={async () => {
        const pictureMetadata = await cameraRef.current.takePictureAsync();
        console.log("pictureMetadata", pictureMetadata);
        console.log(
            await ImageManipulator.manipulateAsync(pictureMetadata.uri, [
              { resize: { width: 800 } },
            ])
        )
    }} />
</>)
}

const styles = StyleSheet.create({
  camera: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
  }
});