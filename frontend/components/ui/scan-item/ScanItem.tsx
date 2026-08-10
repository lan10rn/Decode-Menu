import { Image, styled, Text, XStack, YStack } from "tamagui";

// 1. Variant-driven badge background
const BadgeBox = styled(YStack, {
  px: "$2",
  py: "$1",
  br: "$round",
  ai: "center",
  jc: "center",

  variants: {
    status: {
      safe: { bg: "$successSoft" },
      caution: { bg: "$warningSoft" },
    },
  } as const,
});

// 2. Variant-driven badge text
const BadgeText = styled(Text, {
  fontFamily: "$body",
  fontSize: 10, // Using raw 10 here for micro-typography
  fontWeight: "800",
  textTransform: "uppercase",

  variants: {
    status: {
      safe: { color: "$successText" },
      caution: { color: "$warningText" },
    },
  } as const,
});

export function ScanItem({
  title,
  subtitle,
  imageUrl,
  status,
}: {
  title: string;
  subtitle: string;
  imageUrl: string;
  status: "safe" | "caution";
}) {
  return (
    <XStack
      p="$3"
      ai="center"
      br="$2"
      pressStyle={{ bg: "$border" }} // Native touch feedback
    >
      {/* Thumbnail */}
      <Image
        src={imageUrl}
        width={40}
        height={40}
        borderRadius={8}
        marginRight={12}
        backgroundColor="$border"
      />

      {/* Text Container (f={1} allows it to take remaining space) */}
      <YStack f={1} mr="$3">
        <Text
          fontFamily="$body"
          fontSize="$2"
          fontWeight="600"
          color="$textMain"
          numberOfLines={1}
        >
          {title}
        </Text>
        <Text
          fontFamily="$body"
          fontSize="$1"
          color="$textSub"
          numberOfLines={1}
        >
          {subtitle}
        </Text>
      </YStack>

      {/* Status Badge */}
      <BadgeBox status={status}>
        <BadgeText status={status}>{status}</BadgeText>
      </BadgeBox>
    </XStack>
  );
}
