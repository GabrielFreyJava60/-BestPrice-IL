import { View, ActivityIndicator, Text } from 'react-native';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'small' | 'large';
}

export function LoadingSpinner({ message, size = 'large' }: LoadingSpinnerProps) {
  return (
    <View className="flex-1 items-center justify-center py-10">
      <ActivityIndicator size={size} color="#0066CC" />
      {message && <Text className="mt-4 text-textSecondary">{message}</Text>}
    </View>
  );
}

