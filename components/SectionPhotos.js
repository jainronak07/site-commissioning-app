import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { FORM_CONFIG } from '../config';
import { styles } from '../styles';

export default function SectionPhotos({ data, togglePhoto }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>C — Photos</Text>
      <Text style={styles.helperText}>Tap a slot to capture/uncapture photo.</Text>

      <Text style={styles.photoGroupTitle}>Foundation</Text>
      {FORM_CONFIG.foundationPhotos.map((p) => {
        const key = `Foundation - ${p}`;
        const isDone = !!data.photos[key];
        return (
          <TouchableOpacity
            key={key}
            style={[styles.photoButton, isDone && styles.photoButtonDone]}
            onPress={() => togglePhoto(key)}
          >
            <Text style={isDone ? styles.photoTextDone : styles.photoText}>
              {key} {isDone ? '✓ (Captured)' : '○ (Pending)'}
            </Text>
          </TouchableOpacity>
        );
      })}

      <Text style={styles.photoGroupTitle}>Structure</Text>
      {FORM_CONFIG.structurePhotos.map((p) => {
        const key = `Structure - ${p}`;
        const isDone = !!data.photos[key];
        return (
          <TouchableOpacity
            key={key}
            style={[styles.photoButton, isDone && styles.photoButtonDone]}
            onPress={() => togglePhoto(key)}
          >
            <Text style={isDone ? styles.photoTextDone : styles.photoText}>
              {key} {isDone ? '✓ (Captured)' : '○ (Pending)'}
            </Text>
          </TouchableOpacity>
        );
      })}

      {data.earthingWorks === 'Yes' && (
        <>
          <Text style={styles.photoGroupTitle}>Earthing Points</Text>
          {Array.from({ length: parseInt(data.earthingCount) || 1 }).map((_, idx) => {
            const key = `Earthing - EP${idx + 1}`;
            const isDone = !!data.photos[key];
            return (
              <TouchableOpacity
                key={key}
                style={[styles.photoButton, isDone && styles.photoButtonDone]}
                onPress={() => togglePhoto(key)}
              >
                <Text style={isDone ? styles.photoTextDone : styles.photoText}>
                  {key} {isDone ? '✓ (Captured)' : '○ (Pending)'}
                </Text>
              </TouchableOpacity>
            );
          })}
        </>
      )}
    </View>
  );
}