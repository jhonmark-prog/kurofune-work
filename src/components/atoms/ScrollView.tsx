import { ScrollView as RNScrollView, ScrollViewProps, ViewStyle } from 'react-native';

interface ScrollViewComponentProps extends ScrollViewProps {
  style?: ViewStyle;
  contentStyle?: ViewStyle;
}

export function ScrollView(props: ScrollViewComponentProps) {
  return (
    <RNScrollView
      showsVerticalScrollIndicator={false}
      {...props}
    />
  );
}