import { MaterialIcons } from "@expo/vector-icons";
import { Text, XStack, YStack, useTheme } from "tamagui";

export function InfoCard() {
  const theme = useTheme();

  return (
    <XStack
      p="$4"
      br="$2"
      bg="$primarySoft"
      borderWidth={1}
      borderColor="$primarySoft"
      ai="flex-start"
    >
      <YStack mr="$3" mt="$1">
        <MaterialIcons name="translate" size={20} color={theme.primary.val} />
      </YStack>

      <YStack f={1}>
        <Text
          fontFamily="$body"
          fontSize="$3"
          fontWeight="600"
          color="$textMain"
          mb="$1"
        >
          Multilingual Support
        </Text>
        <Text fontFamily="$body" fontSize="$2" color="$textSub" lineHeight="$3">
          Works with foreign menus including Thai, Japanese, French, and more.
        </Text>
      </YStack>
    </XStack>
  );
}
