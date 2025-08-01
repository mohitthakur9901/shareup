import { Redirect, Tabs } from "expo-router";
import { Feather } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@clerk/clerk-expo";


const TabsLayout = () => {
  const insets = useSafeAreaInsets();

  const { isSignedIn } = useAuth();

  if (!isSignedIn) return <Redirect href="/(auth)" />;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: "#1DA1F2",
        tabBarInactiveTintColor: "#657786",
        tabBarStyle: {
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#E1E8ED",
          height: 50 + insets.bottom,
          paddingTop: 8,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          tabBarIcon: ({ color, size }) => <Feather name="home" size={size} color={color} />,

        }}
      />
      <Tabs.Screen 
      name="settings"
      options={{
        title: "",
        tabBarIcon: ({ color, size }) => <Feather name="settings" size={size} color={color} />,
      }}
      />
     
    </Tabs>
  );
};
export default TabsLayout;