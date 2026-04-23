import { useState } from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { Typography } from '@/components';
import { Colors } from '@/constants/colors';
import { editModalStyles as styles } from '../../styles/ProfileEditModal.styles';
import { GENDER_OPTIONS, VISA_TYPE_OPTIONS } from '../../constants/profileData';
import type { Profile, ProfileEditTab } from '../../types/profile.types';

interface PersonalTabProps {
  profile: Profile;
  onSave: (data: Partial<Profile>) => void;
}

export function PersonalTab({ profile, onSave }: PersonalTabProps) {
  const [fullName, setFullName] = useState(profile.full_name);
  const [email, setEmail] = useState(profile.email);
  const [jobTitle, setJobTitle] = useState(profile.job_title ?? '');
  const [aboutMe, setAboutMe] = useState(profile.about_me ?? '');
  const [phone, setPhone] = useState(profile.phone ?? '');
  const [location, setLocation] = useState(profile.location ?? '');
  const [gender, setGender] = useState(profile.gender ?? '');
  const [visaType, setVisaType] = useState(profile.current_visa_type ?? '');

  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleSave = () => {
    onSave({
      full_name: fullName,
      email,
      job_title: jobTitle || null,
      about_me: aboutMe || null,
      phone: phone || null,
      location: location || null,
      gender: gender || null,
      current_visa_type: visaType || null,
    });
  };

  const inputStyle = (field: string) => [
    styles.textInput,
    focusedField === field && styles.textInputFocused,
  ];

  return (
    <>
      <ScrollView
        style={styles.formScroll}
        contentContainerStyle={styles.formContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Typography style={styles.fieldLabel}>
          Full Name <Typography style={styles.required}>*</Typography>
        </Typography>
        <TextInput
          style={inputStyle('fullName')}
          value={fullName}
          onChangeText={setFullName}
          placeholder="Full Name"
          placeholderTextColor={Colors.textTertiary}
          onFocus={() => setFocusedField('fullName')}
          onBlur={() => setFocusedField(null)}
        />

        <Typography style={styles.fieldLabel}>
          Email Address <Typography style={styles.required}>*</Typography>
        </Typography>
        <TextInput
          style={inputStyle('email')}
          value={email}
          onChangeText={setEmail}
          placeholder="Email Address"
          placeholderTextColor={Colors.textTertiary}
          keyboardType="email-address"
          autoCapitalize="none"
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField(null)}
        />

        <Typography style={styles.fieldLabel}>
          Profile Job Title <Typography style={styles.required}>*</Typography>
        </Typography>
        <TextInput
          style={inputStyle('jobTitle')}
          value={jobTitle}
          onChangeText={setJobTitle}
          placeholder="Tell us your main profession..."
          placeholderTextColor={Colors.textTertiary}
          onFocus={() => setFocusedField('jobTitle')}
          onBlur={() => setFocusedField(null)}
        />

        <Typography style={styles.fieldLabel}>About me</Typography>
        <TextInput
          style={[inputStyle('aboutMe'), styles.textInputMultiline]}
          value={aboutMe}
          onChangeText={setAboutMe}
          placeholder="Describe yourself..."
          placeholderTextColor={Colors.textTertiary}
          multiline
          numberOfLines={4}
          onFocus={() => setFocusedField('aboutMe')}
          onBlur={() => setFocusedField(null)}
        />

        <Typography style={styles.fieldLabel}>
          Phone Number <Typography style={styles.required}>*</Typography>
        </Typography>
        <TextInput
          style={inputStyle('phone')}
          value={phone}
          onChangeText={setPhone}
          placeholder="Phone Number"
          placeholderTextColor={Colors.textTertiary}
          keyboardType="phone-pad"
          onFocus={() => setFocusedField('phone')}
          onBlur={() => setFocusedField(null)}
        />

        <Typography style={styles.fieldLabel}>
          Location <Typography style={styles.required}>*</Typography>
        </Typography>
        <TextInput
          style={inputStyle('location')}
          value={location}
          onChangeText={setLocation}
          placeholder="Location"
          placeholderTextColor={Colors.textTertiary}
          onFocus={() => setFocusedField('location')}
          onBlur={() => setFocusedField(null)}
        />

        <Typography style={styles.fieldLabel}>Gender</Typography>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={gender}
            onValueChange={setGender}
            style={styles.picker}
          >
            <Picker.Item label="- Select gender -" value="" />
            {GENDER_OPTIONS.map((opt) => (
              <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </Picker>
        </View>

        <Typography style={styles.fieldLabel}>
          Current Visa Type <Typography style={styles.required}>*</Typography>
        </Typography>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={visaType}
            onValueChange={setVisaType}
            style={styles.picker}
          >
            <Picker.Item label="- Select visa type -" value="" />
            {VISA_TYPE_OPTIONS.map((opt) => (
              <Picker.Item key={opt.value} label={opt.label} value={opt.value} />
            ))}
          </Picker>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
        <Typography style={styles.saveBtnText}>Save</Typography>
      </TouchableOpacity>
    </>
  );
}