import { View, Text } from 'react-native';
import Svg, { Circle } from 'react-native-svg';
import { Colors } from '@/constants/colors';

interface ProgressRingProps {
  percentage: number;
  size?: number;
  strokeWidth?: number;
  progressColor?: string;
  trackColor?: string;
  style?: any;
}

export function ProgressRing({
  percentage,
  size = 50,
  strokeWidth = 5,
  progressColor = Colors.primary,
  trackColor = Colors.primaryLight,
  style
}: ProgressRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDash = (percentage / 100) * circumference;

  return (
    <View style={[style, { position: 'relative', alignItems: 'center', justifyContent: 'center' }]}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={progressColor}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={`${strokeDash} ${circumference}`}
          strokeLinecap="round"
          rotation="-90"
          originX={size / 2}
          originY={size / 2}
        />
      </Svg>
      <Text style={{
        fontSize: 12,
        fontWeight: '500',
        color: Colors.textPrimary,
        textAlign: 'center',
      }}>
        {percentage}%
      </Text>
    </View>
  );
}