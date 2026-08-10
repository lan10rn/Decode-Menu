import { MaterialIcons } from "@expo/vector-icons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs"; // Types from React Navigation
import { Text, XStack, YStack, useTheme } from "tamagui";

export function BottomNav({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const theme = useTheme();

  // Map route names to icons and labels
  const tabConfig: Record<
    string,
    { icon: keyof typeof MaterialIcons.glyphMap; label: string }
  > = {
    index: { icon: "photo-camera", label: "Scan" },
    profile: { icon: "person", label: "Profile" },
    diet: { icon: "restaurant", label: "Diet" },
  };

  return (
    <XStack
      pos="absolute"
      bottom={0}
      left={0}
      right={0}
      bg="$surface"
      borderTopWidth={1}
      borderColor="$border"
      px="$2"
      pt="$3"
      pb="$6"
      jc="space-around"
      ai="center"
    >
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;
        const config = tabConfig[route.name];

        if (!config) return null;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <YStack
            key={route.key}
            f={1}
            py="$2"
            ai="center"
            jc="center"
            gap="$1"
            onPress={onPress}
            pressStyle={{ opacity: 0.7 }}
          >
            <MaterialIcons
              name={config.icon}
              size={24}
              color={isFocused ? theme.primary.val : theme.textSub.val}
            />
            <Text
              fontFamily="$body"
              fontSize={10}
              fontWeight={isFocused ? "700" : "500"}
              color={isFocused ? "$primary" : "$textSub"}
            >
              {config.label}
            </Text>
          </YStack>
        );
      })}
    </XStack>
  );
}
