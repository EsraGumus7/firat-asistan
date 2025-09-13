import { IconSymbol } from '@/components/ui/IconSymbol';
import { useColorScheme } from '@/hooks/useColorScheme';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useState } from 'react';
import { Alert, Animated, BackHandler, Dimensions, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDil } from '../DilContext';

interface User {
  uid: string;
  email: string;
  profile?: {
    name: string;
    age: number;
    extraInfo: string[];
  };
}

interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  image?: string;
  type?: string;
}

interface ScheduleItem {
  id: string;
  day: string;
  time: string;
  course: string;
  instructor: string;
  room: string;
  type: 'lecture' | 'lab' | 'exam';
}


const { width } = Dimensions.get('window');

type Language = 'tr' | 'en';

interface Feature {
  id: string;
  title: { tr: string; en: string };
  description: { tr: string; en: string };
  icon: any; // IconSymbol için any kullanıyoruz
  color: string;
  bgColor: string;
  requiresAuth: boolean;
}

// Modern kategori sistemi
const FEATURES: Feature[] = [
  {
    id: 'notebook',
    title: { tr: 'Not Defteri', en: 'Notebook' },
    description: { tr: 'Notlarınızı yönetin', en: 'Manage your notes' },
    icon: 'note.text',
    color: '#60A5FA',
    bgColor: '#DBEAFE',
    requiresAuth: false
  },
  {
    id: 'schedule',
    title: { tr: 'Ders Programı', en: 'Schedule' },
    description: { tr: 'Ders programınızı görüntüleyin', en: 'View your schedule' },
    icon: 'calendar',
    color: '#F59E0B',
    bgColor: '#FEF3C7',
    requiresAuth: false
  },
 
  {
    id: 'settings',
    title: { tr: 'Ayarlar', en: 'Settings' },
    description: { tr: 'Uygulama ayarları', en: 'App settings' },
    icon: 'gearshape',
    color: '#8B5CF6',
    bgColor: '#EDE9FE',
    requiresAuth: false
  }
];

export default function ProfileScreen() {
  const { dil } = useDil() as { dil: Language };
  const colorScheme = useColorScheme();
  const [user, setUser] = useState<User | null>(null);
  const [profileData, setProfileData] = useState<any>(null);
  const [showNotebook, setShowNotebook] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [isWriting, setIsWriting] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: '', content: '', image: '' });
  
  // Animasyon değerleri
  const fadeAnim = useState(new Animated.Value(0))[0];
  const slideAnim = useState(new Animated.Value(50))[0];

  // Animasyonları başlat
  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleLogout = async () => {
    Alert.alert(
      dil === 'tr' ? 'Çıkış Yap' : 'Sign Out',
      dil === 'tr' ? 'Çıkış yapmak istediğinize emin misiniz?' : 'Are you sure you want to sign out?',
      [
        { text: dil === 'tr' ? 'İptal' : 'Cancel', style: 'cancel' },
        {
          text: dil === 'tr' ? 'Çıkış Yap' : 'Sign Out',
          style: 'destructive',
          onPress: async () => {
            
            Alert.alert(
              dil === 'tr' ? 'Bilgi' : 'Info',
              dil === 'tr' ? 'Çıkış sistemi kaldırıldı.' : 'Logout system removed.'
            );
          }
        }
      ]
    );
  };

  // Not kaydetme fonksiyonu
  // Kamera fonksiyonları
  const addPhoto = async () => {
    const { status } = await ImagePicker.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        dil === 'tr' ? 'İzin Gerekli' : 'Permission Required',
        dil === 'tr' ? 'Kamera erişimi için izin gereklidir.' : 'Camera permission is required.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setCurrentNote({ ...currentNote, image: result.assets[0].uri });
    }
  };

  const pickFromGallery = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        dil === 'tr' ? 'İzin Gerekli' : 'Permission Required',
        dil === 'tr' ? 'Galeri erişimi için izin gereklidir.' : 'Gallery permission is required.',
        [{ text: 'OK' }]
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.8,
    });

    if (!result.canceled && result.assets[0]) {
      setCurrentNote({ ...currentNote, image: result.assets[0].uri });
    }
  };

  const saveNote = () => {
    if (currentNote.content.trim() === '' && !currentNote.image) {
      return;
    }

    const note: Note = {
      id: Date.now().toString(),
      title: currentNote.title || (dil === 'tr' ? 'Başlıksız Not' : 'Untitled Note'),
      content: currentNote.content,
      image: currentNote.image,
      date: new Date().toLocaleDateString('tr-TR', { 
        day: 'numeric', 
        month: 'short',
        year: 'numeric'
      })
    };

    setNotes([note, ...notes]);
    
    // Kaydetme başarılı mesajı
    Alert.alert(
      dil === 'tr' ? 'Başarılı' : 'Success',
      dil === 'tr' ? 'Not kaydedildi!' : 'Note saved!',
      [{ text: 'OK' }]
    );
  };

  const handleFeaturePress = (feature: Feature) => {
    switch (feature.id) {
      case 'notebook':
        setShowNotebook(true);
        break;
      case 'schedule':
        setShowSchedule(true);
        break;
      // CLEAN CODE: Çalışma soruları kısmı - artık gereksiz
      // case 'study':
      //   setShowStudyQuestions(true);
      //   break;
      case 'settings':
        // Ayarlar özelliği
        Alert.alert('Yakında', 'Bu özellik yakında eklenecek!');
        break;
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colorScheme === 'dark' ? '#1A1A1A' : '#F8FAFC' }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View 
          style={[
            styles.content,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          {/* Header Bölümü */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View style={styles.avatarContainer}>
                <View style={[styles.avatar, { backgroundColor: user ? '#60A5FA' : '#E2E8F0' }]}>
                  <IconSymbol 
                    name="person.fill" 
                    size={40} 
                    color={user ? '#FFFFFF' : '#94A3B8'} 
                  />
                </View>
                {/* CLEAN CODE: Online indicator ikonu - artık gereksiz */}
                {/* {user && (
                  <View style={styles.onlineIndicator} />
                )} */}
              </View>
              
              <View style={styles.userInfo}>
                {user ? (
                  <>
                    <Text style={[styles.userName, { color: colorScheme === 'dark' ? '#FFFFFF' : '#1E293B' }]}>
                      {profileData?.profile?.name || 'Kullanıcı'}
                    </Text>
                    <Text style={styles.userEmail}>{user.email}</Text>
                    <View style={styles.userStats}>
                      <View style={styles.statItem}>
                        <Text style={styles.statNumber}>12</Text>
                        <Text style={styles.statLabel}>{dil === 'tr' ? 'Not' : 'Notes'}</Text>
                      </View>
                      <View style={styles.statDivider} />
                      <View style={styles.statItem}>
                        <Text style={styles.statNumber}>6</Text>
                        <Text style={styles.statLabel}>{dil === 'tr' ? 'Ders' : 'Courses'}</Text>
                      </View>
                      <View style={styles.statDivider} />
                      <View style={styles.statItem}>
                        <Text style={styles.statNumber}>85%</Text>
                        <Text style={styles.statLabel}>{dil === 'tr' ? 'Başarı' : 'Success'}</Text>
                      </View>
                    </View>
                  </>
                ) : (
                  <>
                    {/* CLEAN CODE: Hoşgeldiniz kısmı - artık gereksiz */}
                    {/* <Text style={[styles.welcomeText, { color: colorScheme === 'dark' ? '#FFFFFF' : '#1E293B' }]}>
                      {dil === 'tr' ? 'Hoş Geldiniz!' : 'Welcome!'}
                    </Text>
                    <Text style={styles.welcomeSubtext}>
                      {dil === 'tr' 
                        ? 'Kişiselleştirilmiş deneyim için giriş yapın'
                        : 'Sign in for a personalized experience'
                      }
                    </Text> */}
                  </>
                )}
              </View>
            </View>
          </View>

          {/* Auth Buttons veya Profile Actions */}
          {user ? (
            <View style={styles.profileActions}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.editButton]}
                onPress={() => setShowProfileEdit(true)}
              >
                <IconSymbol name="pencil" size={20} color="#60A5FA" />
                <Text style={styles.actionButtonText}>
                  {dil === 'tr' ? 'Profili Düzenle' : 'Edit Profile'}
                </Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.logoutButton]}
                onPress={handleLogout}
              >
                <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#EF4444" />
                <Text style={[styles.actionButtonText, { color: '#EF4444' }]}>
                  {dil === 'tr' ? 'Çıkış Yap' : 'Sign Out'}
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            // CLEAN CODE: Eski Firebase giriş/kayıt sistemi - artık gereksiz
            // Giriş/Kayıt butonları kaldırıldı
            <View style={styles.authButtons}>
            
            </View>
          )}

          {/* CLEAN CODE: Features Grid yorumu - artık gereksiz */}
          {/* Features Grid */}
          <View style={styles.featuresSection}>
            <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#FFFFFF' : '#1E293B' }]}>
              {dil === 'tr' ? 'Özellikler' : 'Features'}
            </Text>
            
            <View style={styles.featuresGrid}>
              {FEATURES.map((feature, index) => (
                <TouchableOpacity
                  key={feature.id}
                  style={[
                    styles.featureCard,
                    { backgroundColor: colorScheme === 'dark' ? '#2D2D2D' : '#FFFFFF' },
                    { shadowColor: colorScheme === 'dark' ? '#000' : '#000' }
                  ]}
                  onPress={() => handleFeaturePress(feature)}
                >
                  <View style={[styles.featureIcon, { backgroundColor: feature.bgColor }]}>
                    <IconSymbol name={feature.icon} size={28} color={feature.color} />
                  </View>
                  
                  <View style={styles.featureContent}>
                    <Text style={[styles.featureTitle, { color: colorScheme === 'dark' ? '#FFFFFF' : '#1E293B' }]}>
                      {feature.title[dil]}
                    </Text>
                    <Text style={[styles.featureDescription, { color: colorScheme === 'dark' ? '#94A3B8' : '#64748B' }]}>
                      {feature.description[dil]}
                    </Text>
                  </View>
                  
                  <IconSymbol 
                    name="chevron.right" 
                    size={16} 
                    color={colorScheme === 'dark' ? '#94A3B8' : '#64748B'} 
                    style={styles.chevron}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quick Stats */}
          {user && (
            <View style={styles.statsSection}>
              <Text style={[styles.sectionTitle, { color: colorScheme === 'dark' ? '#FFFFFF' : '#1E293B' }]}>
                {dil === 'tr' ? 'Hızlı İstatistikler' : 'Quick Stats'}
              </Text>
              
              <View style={styles.statsGrid}>
                <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? '#2D2D2D' : '#FFFFFF' }]}>
                  <IconSymbol name="clock" size={24} color="#60A5FA" />
                  <Text style={styles.statCardNumber}>24</Text>
                  <Text style={[styles.statCardLabel, { color: colorScheme === 'dark' ? '#94A3B8' : '#64748B' }]}>
                    {dil === 'tr' ? 'Saat Çalışma' : 'Study Hours'}
                  </Text>
                </View>
                
                <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? '#2D2D2D' : '#FFFFFF' }]}>
                  <IconSymbol name="checkmark.circle" size={24} color="#10B981" />
                  <Text style={styles.statCardNumber}>8</Text>
                  <Text style={[styles.statCardLabel, { color: colorScheme === 'dark' ? '#94A3B8' : '#64748B' }]}>
                    {dil === 'tr' ? 'Tamamlanan' : 'Completed'}
                  </Text>
                </View>
                
                <View style={[styles.statCard, { backgroundColor: colorScheme === 'dark' ? '#2D2D2D' : '#FFFFFF' }]}>
                  <IconSymbol name="star" size={24} color="#F59E0B" />
                  <Text style={styles.statCardNumber}>4.8</Text>
                  <Text style={[styles.statCardLabel, { color: colorScheme === 'dark' ? '#94A3B8' : '#64748B' }]}>
                    {dil === 'tr' ? 'Puan' : 'Rating'}
                  </Text>
                </View>
              </View>
            </View>
          )}
        </Animated.View>
      </ScrollView>

      {/* Profile Edit Modal */}
      <ProfileEditModal
        visible={showProfileEdit}
        onClose={() => setShowProfileEdit(false)}
        user={user}
        profileData={profileData}
        onUpdate={(newData) => setProfileData(newData)}
      />

      {/* Notebook Modal */}
      <Modal
        visible={showNotebook}
                animationType="slide"
        transparent={false}
        onRequestClose={() => {
          // Telefonun geri butonuna basıldığında
          if (isWriting) {
            // Yazma modundaysa notu kaydet ve notlar listesine dön
            saveNote();
            setCurrentNote({ title: '', content: '', image: '' });
            setIsWriting(false);
          } else {
            // Notlar listesindeyse modal'ı kapat (profil sekmesine dön)
            setShowNotebook(false);
          }
        }}
        >
        <NotebookModal
          visible={showNotebook}
          onClose={() => setShowNotebook(false)}
          notes={notes}
          setNotes={setNotes}
          isWriting={isWriting}
          setIsWriting={setIsWriting}
          currentNote={currentNote}
          setCurrentNote={setCurrentNote}
          saveNote={saveNote}
          addPhoto={addPhoto}
          pickFromGallery={pickFromGallery}
        />
      </Modal>

      {/* Schedule Modal */}
      <ScheduleModal
        visible={showSchedule}
        onClose={() => setShowSchedule(false)}
      />

    </View>
  );
}

// Profile Edit Modal Component
function ProfileEditModal({ 
  visible, 
  onClose, 
  user, 
  profileData, 
  onUpdate 
}: { 
  visible: boolean; 
  onClose: () => void; 
  user: User | null; 
  profileData: any; 
  onUpdate: (newData: any) => void; 
}) {
  const { dil } = useDil() as { dil: Language };
  const [editName, setEditName] = useState('');
  const [editAge, setEditAge] = useState('');
  const [editExtraInfo, setEditExtraInfo] = useState(['']);

  useEffect(() => {
    if (visible && profileData) {
      setEditName(profileData?.profile?.name || '');
      setEditAge(profileData?.profile?.age ? String(profileData.profile.age) : '');
      setEditExtraInfo(Array.isArray(profileData?.profile?.extraInfo) ? [...profileData.profile.extraInfo] : ['']);
    }
  }, [visible, profileData]);

  const handleSave = async () => {
    if (!editName.trim() || !editAge.trim() || isNaN(Number(editAge)) || Number(editAge) < 1) {
      Alert.alert(dil === 'tr' ? 'Hata' : 'Error', dil === 'tr' ? 'Geçerli bir isim ve yaş girin.' : 'Enter a valid name and age.');
      return;
    }

    if (!user) return;

    const filteredExtraInfo = editExtraInfo.map(i => i.trim()).filter(i => i.length > 0);
    
    Alert.alert(
      dil === 'tr' ? 'Bilgi' : 'Info',
      dil === 'tr' ? 'Profil güncelleme sistemi kaldırıldı.' : 'Profile update system removed.'
    );
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{dil === 'tr' ? 'Profili Düzenle' : 'Edit Profile'}</Text>
            <TouchableOpacity onPress={onClose}>
              <IconSymbol name="xmark" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView style={styles.modalBody}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{dil === 'tr' ? 'İsim' : 'Name'}</Text>
              <TextInput
                style={styles.input}
                value={editName}
                onChangeText={setEditName}
                placeholder={dil === 'tr' ? 'İsminizi girin' : 'Enter your name'}
                maxLength={50}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{dil === 'tr' ? 'Yaş' : 'Age'}</Text>
              <TextInput
                style={styles.input}
                value={editAge}
                onChangeText={text => setEditAge(text.replace(/[^0-9]/g, ''))}
                placeholder={dil === 'tr' ? 'Yaşınızı girin' : 'Enter your age'}
                keyboardType="numeric"
                maxLength={3}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>{dil === 'tr' ? 'Ek Bilgiler' : 'Extra Info'}</Text>
              {editExtraInfo.map((info, idx) => (
                <View key={idx} style={styles.extraInfoRow}>
                  <TextInput
                    style={[styles.input, { flex: 1 }]}
                    value={info}
                    onChangeText={text => {
                      const arr = [...editExtraInfo];
                      arr[idx] = text.slice(0, 100);
                      setEditExtraInfo(arr);
                    }}
                    placeholder={dil === 'tr' ? 'Ek bilgi girin' : 'Enter extra info'}
                    maxLength={100}
                  />
                  {editExtraInfo.length > 1 && (
                    <TouchableOpacity 
                      style={styles.removeButton}
                      onPress={() => setEditExtraInfo(editExtraInfo.filter((_, i) => i !== idx))}
                    >
                      <IconSymbol name="minus.circle.fill" size={24} color="#EF4444" />
                    </TouchableOpacity>
                  )}
                </View>
              ))}
              {editExtraInfo.length < 3 && (
                <TouchableOpacity 
                  style={styles.addButton}
                  onPress={() => setEditExtraInfo([...editExtraInfo, ''])}
                >
                  <IconSymbol name="plus.circle.fill" size={20} color="#60A5FA" />
                  <Text style={styles.addButtonText}>{dil === 'tr' ? 'Bilgi Ekle' : 'Add Info'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </ScrollView>

          <View style={styles.modalFooter}>
            <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
              <Text style={styles.cancelButtonText}>{dil === 'tr' ? 'İptal' : 'Cancel'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveButtonText}>{dil === 'tr' ? 'Kaydet' : 'Save'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

// Notebook Modal Component  
function NotebookModal({ 
  visible, 
  onClose, 
  notes, 
  setNotes,
  isWriting,
  setIsWriting,
  currentNote,
  setCurrentNote,
  saveNote,
  addPhoto,
  pickFromGallery
}: { 
  visible: boolean; 
  onClose: () => void; 
  notes: Note[]; 
  setNotes: (notes: Note[]) => void; 
  isWriting: boolean;
  setIsWriting: (isWriting: boolean) => void;
  currentNote: { title: string; content: string; image: string };
  setCurrentNote: (note: { title: string; content: string; image: string }) => void;
  saveNote: () => void;
  addPhoto: () => Promise<void>;
  pickFromGallery: () => Promise<void>;
}) {
  const { dil } = useDil() as { dil: Language };
  const [fontSize, setFontSize] = useState(18);
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right'>('left');
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);
  
  // Çizim özellikleri
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawingMode, setDrawingMode] = useState<'pen' | 'highlighter' | 'eraser'>('pen');
  const [penColor, setPenColor] = useState('#FFFFFF');
  const [penSize, setPenSize] = useState(3);
  const [drawingPaths, setDrawingPaths] = useState<any[]>([]);
  const [currentPath, setCurrentPath] = useState<any>(null);
  
  // Liste özellikleri
  const [isListMode, setIsListMode] = useState(false);
  const [listType, setListType] = useState<'bullet' | 'numbered'>('bullet');

  // Telefonun geri butonunu dinle
  useEffect(() => {
    const handleBackPress = () => {
              if (isWriting) {
          // Eğer yazma modundaysa, önce notu kaydet sonra notlar listesine dön
                      saveNote();
            setCurrentNote({ title: '', content: '', image: '' });
            setIsWriting(false);
          return true; // Geri butonunu handle ettik
        }
      return false; // Geri butonunu handle etmedik
    };

    // BackHandler'ı ekle
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
    
    return () => backHandler.remove();
  }, [isWriting]);

  const startWriting = () => {
    setCurrentNote({ title: '', content: '', image: '' });
    setIsWriting(true);
  };

  const deleteNote = (id: string) => {
    Alert.alert(
      dil === 'tr' ? 'Notu Sil' : 'Delete Note',
      dil === 'tr' ? 'Bu notu silmek istediğinize emin misiniz?' : 'Are you sure you want to delete this note?',
      [
        { text: dil === 'tr' ? 'İptal' : 'Cancel', style: 'cancel' },
        { text: dil === 'tr' ? 'Sil' : 'Delete', style: 'destructive', onPress: () => setNotes(notes.filter(n => n.id !== id)) }
      ]
    );
  };

  // Çizim fonksiyonları
  const startDrawing = () => {
    setIsDrawing(true);
    setIsWriting(false);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setIsWriting(true);
  };

  const clearDrawing = () => {
    setDrawingPaths([]);
    setCurrentPath(null);
  };

  const handleDrawingPress = (event: any) => {
    if (!isDrawing) return;
    
    const { locationX, locationY } = event.nativeEvent;
    const newPath = {
      id: Date.now(),
      points: [{ x: locationX, y: locationY }],
      color: penColor,
      size: penSize,
      mode: drawingMode
    };
    setCurrentPath(newPath);
  };

  const handleDrawingMove = (event: any) => {
    if (!isDrawing || !currentPath) return;
    
    const { locationX, locationY } = event.nativeEvent;
    setCurrentPath({
      ...currentPath,
      points: [...currentPath.points, { x: locationX, y: locationY }]
    });
  };

  const handleDrawingRelease = () => {
    if (currentPath) {
      setDrawingPaths([...drawingPaths, currentPath]);
      setCurrentPath(null);
    }
  };

  // Liste fonksiyonları
  const toggleListMode = () => {
    setIsListMode(!isListMode);
    if (!isListMode) {
      // Liste moduna geçerken mevcut metni listeye çevir
      const lines = currentNote.content.split('\n');
      const listLines = lines.map((line, index) => {
        if (line.trim() === '') return line;
        return listType === 'bullet' ? `• ${line}` : `${index + 1}. ${line}`;
      });
      setCurrentNote({ ...currentNote, content: listLines.join('\n') });
    }
  };

  // Font boyutu seçici
  const showFontSizePicker = () => {
    Alert.alert(
      dil === 'tr' ? 'Font Boyutu' : 'Font Size',
      dil === 'tr' ? 'Font boyutunu seçin:' : 'Select font size:',
      [
        { text: '12', onPress: () => setFontSize(12) },
        { text: '14', onPress: () => setFontSize(14) },
        { text: '16', onPress: () => setFontSize(16) },
        { text: '18', onPress: () => setFontSize(18) },
        { text: '20', onPress: () => setFontSize(20) },
        { text: '24', onPress: () => setFontSize(24) },
        { text: '28', onPress: () => setFontSize(28) },
        { text: '32', onPress: () => setFontSize(32) },
        { text: dil === 'tr' ? 'İptal' : 'Cancel', style: 'cancel' }
      ]
    );
  };

  if (isWriting) {
    return (
        <View style={styles.writingFullScreen}>
        {/* Yazma Modu Header */}
        <View style={styles.writingHeader}>
          <TouchableOpacity onPress={() => {
                         saveNote(); // Otomatik kaydet
             setCurrentNote({ title: '', content: '', image: '' }); // Notu temizle
             setIsWriting(false);
            // Modal açık kalır, sadece içerik notlar listesine döner
          }} style={styles.backButton}>
            <Text style={{ color: '#FFFFFF', fontSize: 20, fontWeight: 'bold' }}>←</Text>
          </TouchableOpacity>
          <Text style={styles.writingTitle}>
            {dil === 'tr' ? 'Başlık' : 'Title'}
          </Text>
          <View style={styles.headerActions}>
            <TouchableOpacity onPress={saveNote} style={styles.saveButton}>
              <Text style={styles.saveButtonText}>
                {dil === 'tr' ? 'Kaydet' : 'Save'}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.moreNoteButton}>
              <IconSymbol name="ellipsis" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Başlık Input */}
        <TextInput
          style={styles.titleEditor}
          placeholder={dil === 'tr' ? 'Başlık' : 'Title'}
          placeholderTextColor="#666666"
          value={currentNote.title}
          onChangeText={(text) => setCurrentNote({ ...currentNote, title: text })}
        />

        {/* İçerik Editörü veya Çizim Alanı */}
        {isDrawing ? (
          <View 
            style={styles.drawingCanvas}
            onTouchStart={handleDrawingPress}
            onTouchMove={handleDrawingMove}
            onTouchEnd={handleDrawingRelease}
          >
            {/* Çizim yolları */}
            {drawingPaths.map((path) => (
              <View key={path.id} style={styles.drawingPath}>
                {path.points.map((point: any, index: number) => {
                  if (index === 0) return null;
                  const prevPoint = path.points[index - 1];
                  return (
                    <View
                      key={index}
                      style={[
                        styles.drawingLine,
                        {
                          left: prevPoint.x,
                          top: prevPoint.y,
                          width: Math.sqrt(
                            Math.pow(point.x - prevPoint.x, 2) + 
                            Math.pow(point.y - prevPoint.y, 2)
                          ),
                          height: path.size,
                          backgroundColor: path.color,
                          transform: [{
                            rotate: `${Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x)}rad`
                          }]
                        }
                      ]}
                    />
                  );
                })}
              </View>
            ))}
            
            {/* Mevcut çizim yolu */}
            {currentPath && (
              <View style={styles.drawingPath}>
                {currentPath.points.map((point: any, index: number) => {
                  if (index === 0) return null;
                  const prevPoint = currentPath.points[index - 1];
                  return (
                    <View
                      key={index}
                      style={[
                        styles.drawingLine,
                        {
                          left: prevPoint.x,
                          top: prevPoint.y,
                          width: Math.sqrt(
                            Math.pow(point.x - prevPoint.x, 2) + 
                            Math.pow(point.y - prevPoint.y, 2)
                          ),
                          height: currentPath.size,
                          backgroundColor: currentPath.color,
                          transform: [{
                            rotate: `${Math.atan2(point.y - prevPoint.y, point.x - prevPoint.x)}rad`
                          }]
                        }
                      ]}
                    />
                  );
                })}
              </View>
            )}
          </View>
        ) : (
          <TextInput
            style={[
              styles.contentEditor,
              {
                fontSize: fontSize,
                textAlign: textAlign,
                fontWeight: isBold ? 'bold' : 'normal',
                fontStyle: isItalic ? 'italic' : 'normal',
                textDecorationLine: isUnderline ? 'underline' : 'none',
              }
            ]}
            placeholder={dil === 'tr' ? 'Yazmaya başlayın...' : 'Start writing...'}
            placeholderTextColor="#666666"
            value={currentNote.content}
            onChangeText={(text) => setCurrentNote({ ...currentNote, content: text })}
            multiline
            textAlignVertical="top"
            autoFocus
          />
        )}

        {/* Seçilen Resim */}
        {currentNote.image && (
          <View style={styles.noteImageContainer}>
            <Image source={{ uri: currentNote.image }} style={styles.noteImage} />
            <TouchableOpacity 
              style={styles.removeImageButton}
              onPress={() => setCurrentNote({ ...currentNote, image: '' })}
            >
              <Text style={styles.removeImageButtonText}>✕</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Toolbar */}
        <View style={styles.bottomToolbar}>
          <View style={styles.toolbarLeft}>
            {/* Kalın Butonu */}
            <TouchableOpacity 
              style={[
                styles.toolbarButton,
                isBold && styles.toolbarButtonActive
              ]}
              onPress={() => setIsBold(!isBold)}
            >
              <Text style={[
                styles.formatButtonText,
                isBold && styles.formatButtonTextActive
              ]}>
                B
              </Text>
            </TouchableOpacity>

            {/* İtalik Butonu */}
            <TouchableOpacity 
              style={[
                styles.toolbarButton,
                isItalic && styles.toolbarButtonActive
              ]}
              onPress={() => setIsItalic(!isItalic)}
            >
              <Text style={[
                styles.formatButtonText,
                isItalic && styles.formatButtonTextActive
              ]}>
                I
              </Text>
            </TouchableOpacity>

            {/* Altı Çizili Butonu */}
            <TouchableOpacity 
              style={[
                styles.toolbarButton,
                isUnderline && styles.toolbarButtonActive
              ]}
              onPress={() => setIsUnderline(!isUnderline)}
            >
              <Text style={[
                styles.formatButtonText,
                isUnderline && styles.formatButtonTextActive
              ]}>
                U
              </Text>
            </TouchableOpacity>

            {/* Liste Butonu */}
            <TouchableOpacity 
              style={[
                styles.toolbarButton,
                isListMode && styles.toolbarButtonActive
              ]}
              onPress={toggleListMode}
            >
              <Text style={[
                styles.formatButtonText,
                isListMode && styles.formatButtonTextActive
              ]}>
                •
              </Text>
            </TouchableOpacity>

            {/* Font Boyut Butonu */}
            <TouchableOpacity 
              style={styles.toolbarButton}
              onPress={showFontSizePicker}
            >
              <Text style={styles.formatButtonText}>
                {fontSize}
              </Text>
            </TouchableOpacity>

            {/* Kamera Butonu */}
            <TouchableOpacity 
              style={styles.toolbarButton}
              onPress={() => {
                Alert.alert(
                  dil === 'tr' ? 'Fotoğraf Ekle' : 'Add Photo',
                  dil === 'tr' ? 'Fotoğraf ekleme yöntemini seçin' : 'Choose photo source',
                  [
                    { text: dil === 'tr' ? 'İptal' : 'Cancel', style: 'cancel' },
                    { text: dil === 'tr' ? 'Kamera' : 'Camera', onPress: addPhoto },
                    { text: dil === 'tr' ? 'Galeri' : 'Gallery', onPress: pickFromGallery }
                  ]
                );
              }}
            >
              <Text style={styles.formatButtonText}>📷</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>


    );
  }

  return (
    <View style={styles.notebookFullScreen}>
      {/* Ana Sayfa Header */}
      <View style={styles.notebookHeader}>
        <TouchableOpacity onPress={onClose} style={styles.backButton}>
          <IconSymbol name="chevron.left" size={24} color="#000000" />
        </TouchableOpacity>
        <Text style={styles.notebookTitle}>{dil === 'tr' ? 'Not Defteri' : 'Notebook'}</Text>
        <TouchableOpacity 
          style={styles.addNoteFab}
          onPress={startWriting}
        >
          <Text style={styles.addNoteFabText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* Notlar Listesi */}
      <ScrollView style={styles.notebookScrollView} showsVerticalScrollIndicator={false}>
        {notes.length === 0 ? (
          <View style={styles.notebookEmptyState}>
            <IconSymbol name="note.text" size={80} color="#E5E7EB" />
            <Text style={styles.emptyStateTitle}>
              {dil === 'tr' ? 'Henüz not yok' : 'No notes yet'}
            </Text>
            <Text style={styles.emptyStateText}>
              {dil === 'tr' 
                ? 'İlk notunuzu yazmak için + butonuna dokunun'
                : 'Tap the + button to write your first note'
              }
            </Text>
          </View>
        ) : (
          notes.map((note) => (
            <TouchableOpacity key={note.id} style={styles.notebookNoteCard} onPress={() => {
              setCurrentNote({ title: note.title, content: note.content || '', image: note.image || '' });
              setIsWriting(true);
            }}>
              <View style={styles.noteCardHeader}>
                <Text style={styles.noteCardTitle}>{note.title}</Text>
                <TouchableOpacity 
                  onPress={(e) => {
                    e.stopPropagation();
                    deleteNote(note.id);
                  }}
                  style={styles.noteDeleteButton}
                >
                  <IconSymbol name="trash" size={18} color="#EF4444" />
                </TouchableOpacity>
              </View>
              {note.content && (
                <Text style={styles.noteCardContent} numberOfLines={4}>
                  {note.content}
                </Text>
              )}
              {note.image && (
                <Image source={{ uri: note.image }} style={styles.noteCardImage} />
              )}
              <Text style={styles.noteCardDate}>{note.date}</Text>
            </TouchableOpacity>
          ))
        )}
      </ScrollView>
    </View>
  );
}

// Schedule Modal Component
function ScheduleModal({ visible, onClose }: { visible: boolean; onClose: () => void }) {
  const { dil } = useDil() as { dil: Language };
  const [selectedDay, setSelectedDay] = useState('Pazartesi');
  const [scheduleData, setScheduleData] = useState<ScheduleItem[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingItem, setEditingItem] = useState<ScheduleItem | null>(null);
  const [newCourse, setNewCourse] = useState('');
  const [newTime, setNewTime] = useState('');
  const [newInstructor, setNewInstructor] = useState('');
  const [newRoom, setNewRoom] = useState('');
  const [newType, setNewType] = useState<'lecture' | 'lab' | 'exam'>('lecture');
  
  const days = ['Pazartesi', 'Salı', 'Çarşamba', 'Perşembe', 'Cuma', 'Cumartesi', 'Pazar'];

  const addCourse = () => {
    // Sadece ders adının doldurulması zorunlu
    if (newCourse.trim()) {
      const newItem: ScheduleItem = {
        id: editingItem ? editingItem.id : Date.now().toString(),
        day: selectedDay,
        time: newTime.trim() || 'Belirtilmemiş',
        course: newCourse.trim(),
        instructor: newInstructor.trim() || 'Belirtilmemiş',
        room: newRoom.trim() || 'Belirtilmemiş',
        type: newType
      };

      if (editingItem) {
        setScheduleData(prev => prev.map(item => item.id === editingItem.id ? newItem : item));
      } else {
        setScheduleData(prev => [...prev, newItem]);
      }

      // Form'u temizle
      setNewCourse('');
      setNewTime('');
      setNewInstructor('');
      setNewRoom('');
      setNewType('lecture');
      setEditingItem(null);
      setShowAddModal(false);
    } else {
      // Ders adı boşsa uyarı göster
      Alert.alert(
        dil === 'tr' ? 'Uyarı' : 'Warning',
        dil === 'tr' ? 'Lütfen en az ders adını girin' : 'Please enter at least the course name',
        [{ text: dil === 'tr' ? 'Tamam' : 'OK' }]
      );
    }
  };

  const editCourse = (item: ScheduleItem) => {
    setEditingItem(item);
    setNewCourse(item.course);
    setNewTime(item.time);
    setNewInstructor(item.instructor);
    setNewRoom(item.room);
    setNewType(item.type);
    setShowAddModal(true);
  };

  const deleteCourse = (id: string) => {
    Alert.alert(
      dil === 'tr' ? 'Dersi Sil' : 'Delete Course',
      dil === 'tr' ? 'Bu dersi silmek istediğinizden emin misiniz?' : 'Are you sure you want to delete this course?',
      [
        { text: dil === 'tr' ? 'İptal' : 'Cancel', style: 'cancel' },
        { 
          text: dil === 'tr' ? 'Sil' : 'Delete', 
          style: 'destructive',
          onPress: () => setScheduleData(prev => prev.filter(item => item.id !== id))
        }
      ]
    );
  };

  const getTypeColor = (type: 'lecture' | 'lab' | 'exam') => {
    switch (type) {
      case 'lecture': return '#3B82F6';
      case 'lab': return '#10B981';
      case 'exam': return '#EF4444';
      default: return '#6B7280';
    }
  };

  const getTypeText = (type: 'lecture' | 'lab' | 'exam') => {
    switch (type) {
      case 'lecture': return dil === 'tr' ? 'Ders' : 'Lecture';
      case 'lab': return dil === 'tr' ? 'Lab' : 'Lab';
      case 'exam': return dil === 'tr' ? 'Sınav' : 'Exam';
      default: return '';
    }
  };

  const filteredSchedule = scheduleData.filter(item => item.day === selectedDay);

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={false}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>{dil === 'tr' ? 'Ders Programı' : 'Schedule'}</Text>
            <TouchableOpacity onPress={onClose}>
              <IconSymbol name="xmark" size={24} color="#64748B" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            style={styles.daySelectorContainer} 
            horizontal 
            showsHorizontalScrollIndicator={false}
          >
            <View style={styles.daySelector}>
              {days.map((day) => (
                <TouchableOpacity
                  key={day}
                  style={[
                    styles.dayButton,
                    selectedDay === day && styles.selectedDayButton
                  ]}
                  onPress={() => setSelectedDay(day)}
                >
                  <Text style={[
                    styles.dayButtonText,
                    selectedDay === day && styles.selectedDayButtonText
                  ]}>
                    {day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          <ScrollView style={styles.scheduleList}>
            {filteredSchedule.length > 0 ? (
              filteredSchedule.map((item) => (
                <View key={item.id} style={[styles.scheduleCard, { borderLeftColor: getTypeColor(item.type) }]}>
                  <View style={styles.scheduleCardHeader}>
                    <View style={styles.scheduleCardLeft}>
                      <Text style={styles.courseName}>{item.course}</Text>
                      <Text style={styles.courseTime}>{item.time}</Text>
                    </View>
                    <View style={styles.scheduleCardRight}>
                      <TouchableOpacity 
                        style={styles.scheduleEditButton}
                        onPress={() => editCourse(item)}
                      >
                        <IconSymbol name="pencil.tip" size={18} color="#3B82F6" />
                      </TouchableOpacity>
                      <TouchableOpacity 
                        style={styles.scheduleDeleteButton}
                        onPress={() => deleteCourse(item.id)}
                      >
                        <IconSymbol name="trash" size={18} color="#EF4444" />
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.scheduleCardDetails}>
                    <Text style={styles.instructorText}>{item.instructor}</Text>
                    <Text style={styles.roomText}>{item.room}</Text>
                    <View style={[styles.typeBadge, { backgroundColor: getTypeColor(item.type) }]}>
                      <Text style={styles.typeText}>{getTypeText(item.type)}</Text>
                    </View>
                  </View>
                </View>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <IconSymbol name="calendar" size={48} color="#CBD5E1" />
                <Text style={styles.emptyText}>
                  {dil === 'tr' ? `${selectedDay} günü için ders bulunmuyor` : `No classes for ${selectedDay}`}
                </Text>
              </View>
            )}
          </ScrollView>

          <TouchableOpacity 
            style={styles.addCourseButton}
            onPress={() => setShowAddModal(true)}
          >
            <IconSymbol name="plus" size={24} color="#FFFFFF" />
            <Text style={styles.addCourseButtonText}>
              {dil === 'tr' ? 'Ders Ekle' : 'Add Course'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Ders Ekleme/Düzenleme Modal */}
        <Modal
          visible={showAddModal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => {
            setShowAddModal(false);
            setEditingItem(null);
            setNewCourse('');
            setNewTime('');
            setNewInstructor('');
            setNewRoom('');
            setNewType('lecture');
          }}
        >
          <View style={styles.addModalOverlay}>
            <View style={styles.addModalContent}>
              <View style={styles.addModalHeader}>
                <Text style={styles.addModalTitle}>
                  {editingItem ? (dil === 'tr' ? 'Dersi Düzenle' : 'Edit Course') : (dil === 'tr' ? 'Yeni Ders Ekle' : 'Add New Course')}
                </Text>
                <TouchableOpacity onPress={() => setShowAddModal(false)}>
                  <IconSymbol name="xmark" size={24} color="#64748B" />
                </TouchableOpacity>
              </View>

              <ScrollView style={styles.addModalForm}>
                <Text style={[styles.formLabel, { color: '#EF4444' }]}>
                  {dil === 'tr' ? 'Ders Adı *' : 'Course Name *'}
                </Text>
                <TextInput
                  style={styles.formInput}
                  value={newCourse}
                  onChangeText={setNewCourse}
                  placeholder={dil === 'tr' ? 'Örn: Matematik (Zorunlu)' : 'e.g. Mathematics (Required)'}
                />

                <Text style={styles.formLabel}>
                  {dil === 'tr' ? 'Saat (Opsiyonel)' : 'Time (Optional)'}
                </Text>
                <TextInput
                  style={styles.formInput}
                  value={newTime}
                  onChangeText={setNewTime}
                  placeholder={dil === 'tr' ? 'Örn: 09:00-10:30 (Boş bırakılabilir)' : 'e.g. 09:00-10:30 (Can be empty)'}
                />

                <Text style={styles.formLabel}>
                  {dil === 'tr' ? 'Öğretmen (Opsiyonel)' : 'Instructor (Optional)'}
                </Text>
                <TextInput
                  style={styles.formInput}
                  value={newInstructor}
                  onChangeText={setNewInstructor}
                  placeholder={dil === 'tr' ? 'Örn: Dr. Ahmet Yılmaz (Boş bırakılabilir)' : 'e.g. Dr. John Smith (Can be empty)'}
                />

                <Text style={styles.formLabel}>
                  {dil === 'tr' ? 'Sınıf (Opsiyonel)' : 'Room (Optional)'}
                </Text>
                <TextInput
                  style={styles.formInput}
                  value={newRoom}
                  onChangeText={setNewRoom}
                  placeholder={dil === 'tr' ? 'Örn: A101 (Boş bırakılabilir)' : 'e.g. A101 (Can be empty)'}
                />

                <Text style={styles.formLabel}>{dil === 'tr' ? 'Ders Tipi' : 'Course Type'}</Text>
                <View style={styles.typeSelector}>
                  {(['lecture', 'lab', 'exam'] as const).map((type) => (
                    <TouchableOpacity
                      key={type}
                      style={[
                        styles.typeOption,
                        newType === type && { backgroundColor: getTypeColor(type) }
                      ]}
                      onPress={() => setNewType(type)}
                    >
                      <Text style={[
                        styles.typeOptionText,
                        newType === type && { color: '#FFFFFF' }
                      ]}>
                        {getTypeText(type)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>

              <View style={styles.addModalFooter}>
                <TouchableOpacity 
                  style={styles.scheduleCancelButton}
                  onPress={() => setShowAddModal(false)}
                >
                  <Text style={styles.scheduleCancelButtonText}>
                    {dil === 'tr' ? 'İptal' : 'Cancel'}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.scheduleSaveButton}
                  onPress={addCourse}
                >
                  <Text style={styles.scheduleSaveButtonText}>
                    {editingItem ? (dil === 'tr' ? 'Güncelle' : 'Update') : (dil === 'tr' ? 'Ekle' : 'Add')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingTop: 60,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 24,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#10B981',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 12,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#64748B',
  },
  userStats: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  statNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#60A5FA',
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#E2E8F0',
    marginRight: 20,
  },
  profileActions: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  editButton: {
    borderWidth: 1,
    borderColor: '#60A5FA',
  },
  logoutButton: {
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#1E293B',
  },
  authButtons: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 32,
  },
  authButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  loginButton: {
    backgroundColor: '#60A5FA',
  },
  registerButton: {
    backgroundColor: '#10B981',
  },
  authButtonText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  featuresSection: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  featuresGrid: {
    gap: 12,
  },
  featureCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    position: 'relative',
  },
  lockIcon: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 2,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  featureDescription: {
    fontSize: 14,
  },
  chevron: {
    marginLeft: 8,
  },
  statsSection: {
    marginBottom: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 12,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statCardNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginTop: 8,
  },
  statCardLabel: {
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  modalBody: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  extraInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  removeButton: {
    marginLeft: 8,
    padding: 4,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#F0F9FF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#60A5FA',
    borderStyle: 'dashed',
  },
  addButtonText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#60A5FA',
  },
  modalFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  cancelButton: {
    flex: 1,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#64748B',
  },
  saveButton: {
    backgroundColor: '#10B981',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: 'center',
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  addNoteContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  titleInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  contentInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  notesList: {
    padding: 20,
  },
  noteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E293B',
  },
  noteDate: {
    fontSize: 14,
    color: '#64748B',
  },
  noteContent: {
    fontSize: 14,
    color: '#475569',
    lineHeight: 20,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    marginTop: 12,
    fontSize: 16,
    color: '#64748B',
    textAlign: 'center',
  },
  daySelectorContainer: {
    paddingVertical: 10,
  },
  daySelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 8,
  },
  dayButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
    minWidth: 80,
  },
  selectedDayButton: {
    backgroundColor: '#60A5FA',
  },
  dayButtonText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#64748B',
    textAlign: 'center',
  },
  selectedDayButtonText: {
    color: '#FFFFFF',
  },
  scheduleList: {
    padding: 20,
  },
  // Notebook Modal Styles
  headerLeft: {
    flex: 1,
  },
  noteCount: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  addNoteButton: {
    backgroundColor: '#60A5FA',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeButton: {
    padding: 4,
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
    color: '#1E293B',
  },
  categoryContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  selectedCategoryButton: {
    backgroundColor: '#60A5FA',
  },
  categoryText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  selectedCategoryText: {
    color: '#FFFFFF',
  },
  addNoteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  addNoteTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  categorySelector: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  categoryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#F1F5F9',
  },
  categoryOptionText: {
    marginLeft: 6,
    fontSize: 14,
    fontWeight: '500',
    color: '#64748B',
  },
  addNoteActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
  },
  noteTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  noteActions: {
    flexDirection: 'row',
    gap: 8,
  },
  noteActionButton: {
    padding: 4,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#64748B',
    marginTop: 12,
    textAlign: 'center',
  },
  // Yeni Notebook Fullscreen Styles
  notebookFullScreen: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  notebookHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 8,
    marginRight: 8,
  },
  notebookTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addNoteFab: {
    backgroundColor: '#3B82F6',
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addNoteFabText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addNoteForm: {
    backgroundColor: '#FFFFFF',
    margin: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  noteTitleInput: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 12,
    marginBottom: 16,
  },
  noteContentInput: {
    fontSize: 16,
    color: '#374151',
    height: 120,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  noteFormButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  cancelNoteButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#F3F4F6',
  },
  cancelNoteText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#6B7280',
  },
  saveNoteButtonMain: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
  },
  saveNoteText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  notebookScrollView: {
    flex: 1,
    padding: 16,
  },
  notebookEmptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 80,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#6B7280',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateText: {
    fontSize: 16,
    color: '#9CA3AF',
    textAlign: 'center',
    paddingHorizontal: 40,
    lineHeight: 24,
  },
  notebookNoteCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  noteCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  noteCardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1F2937',
    flex: 1,
    marginRight: 12,
  },
  noteCardActions: {
    flexDirection: 'row',
    gap: 8,
  },
  noteDeleteButton: {
    padding: 4,
  },
  noteCardContent: {
    fontSize: 16,
    color: '#4B5563',
    lineHeight: 24,
    marginBottom: 12,
  },
  noteCardDate: {
    fontSize: 14,
    color: '#9CA3AF',
    fontStyle: 'italic',
  },
  // Yazma Modu Styles
  writingFullScreen: {
    flex: 1,
    backgroundColor: '#000000',
  },
  writingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 60,
    paddingBottom: 16,
    backgroundColor: '#000000',
  },
  writingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    flex: 1,
    textAlign: 'center',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'flex-end',
    flex: 1,
  },
  saveNoteButton: {
    padding: 4,
  },
  moreNoteButton: {
    padding: 4,
  },
  titleEditor: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#000000',
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
  },
  contentEditor: {
    flex: 1,
    color: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 20,
    backgroundColor: '#000000',
    lineHeight: 26,
  },
  bottomToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#1A1A1A',
    borderTopWidth: 1,
    borderTopColor: '#333333',
  },
  textFormatting: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  formatButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  formatButtonActive: {
    backgroundColor: '#333333',
  },
  formatButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666666',
  },
  formatButtonTextActive: {
    color: '#FFFFFF',
  },
  fontSizeControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  fontSizeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333333',
  },
  fontSizeButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  fontSizeDisplay: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 24,
    textAlign: 'center',
  },
  // Yeni Toolbar Styles
  toolbarLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  toolbarButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#333333',
  },
  scribbleIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scribbleLine: {
    width: 16,
    height: 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 1,
    transform: [{ rotate: '15deg' }],
  },
  listIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  listIconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  listLines: {
    gap: 2,
  },
  listLine: {
    width: 8,
    height: 1,
    backgroundColor: '#FFFFFF',
  },
  underlineIcon: {
    alignItems: 'center',
  },
  underlineIconText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  underlineLine: {
    width: 16,
    height: 1,
    backgroundColor: '#FFFFFF',
    marginTop: 2,
  },
  textBoxIcon: {
    alignItems: 'center',
  },
  textBoxBorder: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 2,
  },
  textBoxIconText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  textBoxLine: {
    width: 16,
    height: 1,
    backgroundColor: '#FFFFFF',
  },
  fontSizeSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fontSizeNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 24,
    textAlign: 'center',
  },
  fontSizeDropdown: {
    padding: 4,
  },
  // Çizim stilleri
  drawingCanvas: {
    flex: 1,
    backgroundColor: '#000000',
    position: 'relative',
  },
  drawingPath: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  drawingLine: {
    position: 'absolute',
    borderRadius: 2,
  },
  // Toolbar aktif durum stilleri
  toolbarButtonActive: {
    backgroundColor: '#333333',
    borderColor: '#FFFFFF',
  },
  // Basit toolbar stilleri
  toolbarRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  fontSizeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    minWidth: 24,
    textAlign: 'center',
  },
  toolbarPlaceholder: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    flex: 1,
  },
  // Font Boyut Modal Styles
  fontSizeModal: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    margin: 40,
    maxHeight: '60%',
  },
  fontSizeModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  fontSizeModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
  },
  fontSizeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 20,
    gap: 12,
  },
  fontSizeOption: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  fontSizeOptionActive: {
    backgroundColor: '#60A5FA',
    borderColor: '#60A5FA',
  },
  fontSizeOptionText: {
    fontWeight: '600',
    color: '#64748B',
  },
  fontSizeOptionTextActive: {
    color: '#FFFFFF',
  },
  // Resim stilleri
  noteImageContainer: {
    marginTop: 16,
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
  },
  noteImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  removeImageButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeImageButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noteCardImage: {
    width: '100%',
    height: 120,
    borderRadius: 8,
    marginTop: 8,
    resizeMode: 'cover',
  },
  // Ders programı stilleri
  scheduleCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scheduleCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  scheduleCardLeft: {
    flex: 1,
  },
  courseName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4,
  },
  courseTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  scheduleCardRight: {
    flexDirection: 'row',
    gap: 8,
  },
  scheduleEditButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#EBF8FF',
    borderWidth: 1,
    borderColor: '#3B82F6',
  },
  scheduleDeleteButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#FEF2F2',
    borderWidth: 1,
    borderColor: '#EF4444',
  },
  scheduleCardDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  instructorText: {
    fontSize: 12,
    color: '#6B7280',
    flex: 1,
  },
  roomText: {
    fontSize: 12,
    color: '#6B7280',
  },
  typeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  typeText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  addCourseButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B82F6',
    padding: 16,
    borderRadius: 12,
    margin: 16,
    gap: 8,
  },
  addCourseButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  // Ders ekleme modal stilleri
  addModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addModalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    width: '90%',
    maxHeight: '80%',
  },
  addModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  addModalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  addModalForm: {
    padding: 20,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 8,
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
  },
  typeSelector: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 16,
  },
  typeOption: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  typeOptionText: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  addModalFooter: {
    flexDirection: 'row',
    gap: 12,
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  scheduleCancelButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
  },
  scheduleCancelButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '500',
  },
  scheduleSaveButton: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
  },
  scheduleSaveButtonText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  // Fakülte seçimi stilleri
  facultyList: {
    padding: 20,
  },
  facultyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  facultyCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  facultyName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#1F2937',
    marginLeft: 12,
  },
}); 