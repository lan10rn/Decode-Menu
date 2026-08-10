import { ActionCard } from "@/components/ui/action-card/ActionCard";
import { Header } from "@/components/ui/header/Header";
import { Hero } from "@/components/ui/hero/Hero";
import { InfoCard } from "@/components/ui/info-card/InfoCard";
import { ScanItem } from "@/components/ui/scan-item/ScanItem";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { ScrollView, Text, XStack, YStack } from "tamagui";

export default function Home() {
  const router = useRouter();

  const handleCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      alert("We need camera access to scan menus!");
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      router.push("/results");
    }
  };

  const handleGallery = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("We need gallery access to upload images!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.8,
    });

    if (!result.canceled) {
      router.push("/results");
    }
  };

  return (
    <YStack f={1} bg="$background">
      <Header />

      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingBottom: 120,
          paddingTop: 16,
        }}
      >
        <Hero />

        <YStack gap="$4" w="100%" mb="$6">
          <ActionCard
            title="Scan Menu"
            subtitle="Use camera to capture text"
            iconName="photo-camera"
            variant="primary"
            onPress={handleCamera}
          />
          <ActionCard
            title="Upload Image"
            subtitle="Select from your gallery"
            iconName="image"
            variant="secondary"
            onPress={handleGallery}
          />
        </YStack>

        <InfoCard />

        {/* Recent Scans Section */}
        <YStack mt="$6">
          <XStack jc="space-between" ai="center" mb="$3">
            <Text
              fontFamily="$body"
              fontSize="$1"
              fontWeight="700"
              color="$textMain"
              textTransform="uppercase"
              letterSpacing={1}
            >
              Recent Scans
            </Text>
            <Text
              fontFamily="$body"
              fontSize="$1"
              fontWeight="600"
              color="$primary"
            >
              View all
            </Text>
          </XStack>

          <YStack
            bg="$surface"
            br="$3"
            borderWidth={1}
            borderColor="$border"
            p="$1"
          >
            <ScanItem
              title="Sushi Izakaya Menu"
              subtitle="Tokyo, Japan • 2 hours ago"
              imageUrl="https://images.unsplash.com/photo-1553621042-f6e147245754?auto=format&fit=crop&w=100&q=80"
              status="safe"
            />
            <ScanItem
              title="Spicy Thai Street Food"
              subtitle="Bangkok, Thailand • Yesterday"
              imageUrl="https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&w=100&q=80"
              status="caution"
            />
          </YStack>
        </YStack>
      </ScrollView>
    </YStack>
  );
}
