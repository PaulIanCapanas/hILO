import React from "react";
import { Text, View } from "react-native";
import { HelloWave } from "@/components/HelloWave";

export default function TestPage() {
    return (
        <View className="bg-red-500">
            <Text className="font-bold">Test Page</Text>
            <HelloWave></HelloWave>
        </View>
    )
}