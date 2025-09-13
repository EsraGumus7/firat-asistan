// ========================================
// USE ASSISTANT HOOK - YENİ BACKEND MAPPING SİSTEMİ
// ========================================

import { useCallback, useState } from 'react';
import { analyzeUserMessage } from '../services/analysisService';

// ========================================
// ASSISTANT HOOK
// ========================================

export const useAssistant = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);
  const [conversationHistory, setConversationHistory] = useState([]);

  // Kullanıcı mesajını işleyen ana fonksiyon
  const handleUserMessage = useCallback(async (message, lang = 'tr') => {
    if (!message || message.trim() === '') {
      return 'Lütfen bir mesaj yazın.';
    }

    setIsProcessing(true);
    
    try {
      console.log('Assistant: Kullanıcı mesajı işleniyor:', message, '(dil:', lang, ')');
      
      // 1. Backend mapping sistemi ile analiz et
      const backendResponse = await analyzeUserMessage(message, lang);
      
      if (backendResponse) {
        console.log('Assistant: Backend cevabı alındı:', backendResponse);
        
        // Konuşma geçmişine ekle
        const conversationEntry = {
          id: Date.now(),
          timestamp: new Date().toISOString(),
          userMessage: message,
          assistantResponse: backendResponse,
          source: 'backend'
        };
        
        setConversationHistory(prev => [...prev, conversationEntry]);
        setLastResponse(backendResponse);
        setIsProcessing(false);
        
        return {
          response: backendResponse,
          source: 'backend',
          success: true
        };
      }
      
      // 2. Backend'den cevap yoksa Gemini'ye gönder
      console.log('Assistant: Backend cevabı yok, Gemini\'ye gönderiliyor');
      
      setIsProcessing(false);
      return {
        response: null,
        source: 'gemini',
        success: true
      };
      
    } catch (error) {
      console.error('Assistant: Hata oluştu:', error);
      
      const errorMessage = 'Üzgünüm, şu anda cevap veremiyorum. Lütfen daha sonra tekrar deneyin.';
      
      // Hata kaydını konuşma geçmişine ekle
      const errorEntry = {
        id: Date.now(),
        timestamp: new Date().toISOString(),
        userMessage: message,
        assistantResponse: errorMessage,
        source: 'error',
        error: error.message
      };
      
      setConversationHistory(prev => [...prev, errorEntry]);
      setLastResponse(errorMessage);
      setIsProcessing(false);
      
      return {
        response: errorMessage,
        source: 'error',
        success: false,
        error: error.message
      };
    }
  }, []);

  // Konuşma geçmişini temizle
  const clearConversation = useCallback(() => {
    setConversationHistory([]);
    setLastResponse(null);
  }, []);

  // Son konuşma kaydını al
  const getLastConversation = useCallback(() => {
    return conversationHistory[conversationHistory.length - 1] || null;
  }, [conversationHistory]);

  // Konuşma geçmişini al
  const getConversationHistory = useCallback(() => {
    return conversationHistory;
  }, [conversationHistory]);

  // Belirli sayıda son konuşmayı al
  const getRecentConversations = useCallback((count = 5) => {
    return conversationHistory.slice(-count);
  }, [conversationHistory]);

  // Konuşma istatistikleri
  const getConversationStats = useCallback(() => {
    const total = conversationHistory.length;
    const backendResponses = conversationHistory.filter(entry => entry.source === 'backend').length;
    const geminiResponses = conversationHistory.filter(entry => entry.source === 'gemini').length;
    const errors = conversationHistory.filter(entry => entry.source === 'error').length;
    
    return {
      total,
      backendResponses,
      geminiResponses,
      errors,
      successRate: total > 0 ? ((total - errors) / total * 100).toFixed(1) : 0
    };
  }, [conversationHistory]);

  // Belirli bir kaydı sil
  const removeConversationEntry = useCallback((id) => {
    setConversationHistory(prev => prev.filter(entry => entry.id !== id));
  }, []);

  // Konuşma geçmişini dışa aktar
  const exportConversation = useCallback(() => {
    return {
      timestamp: new Date().toISOString(),
      totalEntries: conversationHistory.length,
      conversations: conversationHistory,
      stats: getConversationStats()
    };
  }, [conversationHistory, getConversationStats]);

  return {
    // State
    isProcessing,
    lastResponse,
    conversationHistory,
    
    // Ana fonksiyonlar
    handleUserMessage,
    clearConversation,
    
    // Yardımcı fonksiyonlar
    getLastConversation,
    getConversationHistory,
    getRecentConversations,
    getConversationStats,
    removeConversationEntry,
    exportConversation
  };
};

// ========================================
// ÖZEL ASSISTANT HOOK'LARI
// ========================================

// Sadece backend cevapları için hook
export const useBackendOnlyAssistant = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [lastResponse, setLastResponse] = useState(null);

  const handleUserMessage = useCallback(async (message, lang = 'tr') => {
    if (!message || message.trim() === '') {
      return 'Lütfen bir mesaj yazın.';
    }

    setIsProcessing(true);
    
    try {
      const backendResponse = await analyzeUserMessage(message, lang);
      
      if (backendResponse) {
        setLastResponse(backendResponse);
        setIsProcessing(false);
        return {
          response: backendResponse,
          source: 'backend',
          success: true
        };
      } else {
        setIsProcessing(false);
        return {
          response: 'Üzgünüm, bu konuda bilgi bulamadım.',
          source: 'backend',
          success: false
        };
      }
    } catch (error) {
      const errorMessage = 'Üzgünüm, şu anda cevap veremiyorum.';
      setLastResponse(errorMessage);
      setIsProcessing(false);
      
      return {
        response: errorMessage,
        source: 'error',
        success: false,
        error: error.message
      };
    }
  }, []);

  return {
    isProcessing,
    lastResponse,
    handleUserMessage
  };
};

// Test hook'u
export const useTestAssistant = () => {
  const [testResults, setTestResults] = useState([]);

  const runTest = useCallback(async (testMessages, lang = 'tr') => {
    const results = [];
    
    for (const message of testMessages) {
      try {
        const response = await analyzeUserMessage(message, lang);
        results.push({
          message,
          response,
          success: !!response,
          timestamp: new Date().toISOString()
        });
      } catch (error) {
        results.push({
          message,
          response: null,
          success: false,
          error: error.message,
          timestamp: new Date().toISOString()
        });
      }
    }
    
    setTestResults(results);
    return results;
  }, []);

  const clearTestResults = useCallback(() => {
    setTestResults([]);
  }, []);

  return {
    testResults,
    runTest,
    clearTestResults
  };
}; 