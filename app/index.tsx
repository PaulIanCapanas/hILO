import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Stack, useRouter } from "expo-router";
import GoogleSignIn from "@/components/GoogleSignIn";
import { Routes } from "@/enums/routes";

export default function Page() {
  const router = useRouter();

  function handleNavigate() {
    router.push(Routes.LOGIN);
  }
  return (
    <View style={styles.container}>
      <View style={styles.main}>
        <Text style={styles.title}>Hello World</Text>
        <Text style={styles.subtitle}>This is the first page of your</Text>
        <TouchableOpacity
          className="p-20 border border-white"
          onPress={handleNavigate}
        >
          <Text className="text-white text-xl font-boldc">Go to login</Text>
        </TouchableOpacity>
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
