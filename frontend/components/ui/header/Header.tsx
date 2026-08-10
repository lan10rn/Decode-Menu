import { MaterialIcons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text, View, XStack, useTheme } from "tamagui";

export function Header() {
  const theme = useTheme();
  const insets = useSafeAreaInsets(); //Initialize hook

  return (
    <XStack
      px="$6"
      pt={insets.top + 16} // Push the padding down by the hardware notch height
      pb="$4"
      bg="$background"
      ai="center"
      jc="space-between"
    >
      <View
        w="$8"
        h="$8"
        br="$round"
        ai="center"
        jc="center"
        pressStyle={{ bg: "$border" }}
      >
        <MaterialIcons name="history" size={24} color={theme.textMain.val} />
      </View>

      <Text
        fontFamily="$heading"
        fontSize="$4"
        fontWeight="600"
        color="$textMain"
      >
        Menu Analyzer
      </Text>

      <View
        w="$8"
        h="$8"
        br="$round"
        ai="center"
        jc="center"
        pressStyle={{ bg: "$border" }}
      >
        <MaterialIcons name="settings" size={24} color={theme.textMain.val} />
      </View>
    </XStack>
  );
}
