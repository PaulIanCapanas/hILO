import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import { Routes } from "@/enums/routes";
import { HelloWave } from "@/components/HelloWave";

export default function Page() {
  const router = useRouter();

  function handleNavigateToUserProfile() {
    router.push(`/${Routes.USERPROFILE}`);
  }

  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Welcome to hILO!</Text>
        <Text style={styles.subtitle}>Weaving connections: Inspiring the future of Iloilo Woven Products</Text>
        <TouchableOpacity
          className="p-20 border border-white"
          onPress={handleNavigateToUserProfile}
        >
          <Text className="text-black text-xl font-boldc">GO TO USER PROFILE</Text>
        </TouchableOpacity>
        <HelloWave/>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 24,
  },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
});
