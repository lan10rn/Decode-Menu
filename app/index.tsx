import { ActionCard } from "@/components/ui/action-card/ActionCard";
import { BottomNav } from "@/components/ui/bottom-nav/BottomNav";
import { Header } from "@/components/ui/header/Header";
import { Hero } from "@/components/ui/hero/Hero";
import { InfoCard } from "@/components/ui/info-card/InfoCard";
import { ScanItem } from "@/components/ui/scan-item/ScanItem";
import { ScrollView, Text, XStack, YStack } from "tamagui";

export default function Home() {
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
          />
          <ActionCard
            title="Upload Image"
            subtitle="Select from your gallery"
            iconName="image"
            variant="secondary"
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

      {/* Fixed Bottom Navigation */}
      <BottomNav />
    </YStack>
  );
}
