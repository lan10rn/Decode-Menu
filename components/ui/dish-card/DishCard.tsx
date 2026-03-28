import { MaterialIcons } from "@expo/vector-icons";
import { Image, Text, View, XStack, YStack, useTheme } from "tamagui";
import { DishTag, TagVariant } from "../dish-tag/DishTag";

export type DishTagProps = {
  label: string;
  iconName?: keyof typeof MaterialIcons.glyphMap;
  variant: TagVariant;
};

export function DishCard({
  title,
  description,
  imageUrl,
  accuracy,
  tags,
}: {
  title: string;
  description: string;
  imageUrl: string;
  accuracy?: number;
  tags: DishTagProps[];
}) {
  const theme = useTheme();

  return (
    <XStack
      p="$4"
      gap="$4"
      bg="$surface"
      br="$4"
      borderWidth={1}
      borderColor="$border"
    >
      <View w={96} h={96} br="$3" overflow="hidden" pos="relative" bg="$border">
        <Image src={imageUrl} width="100%" height="100%" />

        {/* Accuracy Overlay */}
        {accuracy && (
          <XStack
            pos="absolute"
            bottom={4}
            right={4}
            bg="rgba(0,0,0,0.6)"
            px="$1"
            py={2}
            br="$1"
            ai="center"
            gap={2}
          >
            <MaterialIcons name="photo-camera" size={10} color="#fff" />
            <Text
              fontFamily="$body"
              fontSize={10}
              fontWeight="700"
              color="#fff"
            >
              {accuracy}%
            </Text>
          </XStack>
        )}
      </View>

      {/* Right: Content */}
      <YStack f={1} jc="space-between">
        <YStack>
          <XStack jc="space-between" ai="flex-start">
            <Text
              fontFamily="$heading"
              fontSize="$4"
              fontWeight="700"
              color="$textMain"
              numberOfLines={1}
              f={1}
              pr="$2"
            >
              {title}
            </Text>
            <MaterialIcons
              name="bookmark-border"
              size={20}
              color={theme.textSub.val}
            />
          </XStack>
          <Text
            fontFamily="$body"
            fontSize="$2"
            color="$textSub"
            numberOfLines={2}
            mt="$1"
          >
            {description}
          </Text>
        </YStack>

        {/* Tags Wrap */}
        <XStack flexWrap="wrap" gap="$2" mt="$3">
          {tags.map((tag, idx) => (
            <DishTag key={idx} {...tag} />
          ))}
        </XStack>
      </YStack>
    </XStack>
  );
}
