import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Image } from "react-native";

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

export default function Shimmer({ src, width, height, style }) {
  const [showImage, setShowImage] = useState(false);
  return (
    <>
      {!showImage && (
        <ShimmerPlaceholder
          style={{
            width: showImage ? 0 : width,
            height: showImage ? 0 : height,
            ...style,
          }}
        />
      )}
      <Image
        onLoad={() => setShowImage(true)}
        source={{ ...src }}
        style={{
          width: !showImage ? 0 : width,
          height: !showImage ? 0 : height,
          ...style,
        }}
        resizeMode="cover"
      />
    </>
  );
}
