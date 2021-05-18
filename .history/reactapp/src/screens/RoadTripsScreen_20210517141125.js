import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import { Button, Overlay, Input } from 'react-native-elements';



return (
    <View style={{ flex: 1 }} >
      <Overlay
        isVisible={isVisible}
        onBackdropPress={() => { setIsVisible(false) }}
      >
        <View>
          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder='titre'
            onChangeText={(val) => setTitrePOI(val)}

          />

          <Input
            containerStyle={{ marginBottom: 25 }}
            placeholder='description'
            onChangeText={(val) => setDescPOI(val)}

          />

          <Button
            title="Ajouter POI"
            buttonStyle={{ backgroundColor: "#eb4d4b" }}
            onPress={() => handleSubmit()}
            type="solid"
          />
        </View>
      </Overlay>

      <MapView
        onPress={(e) => { selectPOI(e) }}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 48.866667,
          longitude: 2.333333,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >

        {markerPOI}

        {markerUser}

      </MapView>
      <Button
        disabled={isDisabled}
        title="Add POI"
        icon={
          <Icon
            name="map-marker"
            size={20}
            color="#ffffff"
          />
        }
        buttonStyle={{ backgroundColor: "#eb4d4b" }}
        type="solid"
        onPress={() => setAddPOI(true)} />
    </View>
  );
}
