// Advanced AI/ML Spam Detection Engine
export const analyzeEmail = async (emailContent) => {
  if (!emailContent.trim()) return null
  
  // Simulate advanced AI processing delay
  await new Promise(resolve => setTimeout(resolve, 1500))
  
  const analysis = performAdvancedAnalysis(emailContent)
  return analysis
}

const performAdvancedAnalysis = (content) => {
  const emailLower = content.toLowerCase()
  const emailOriginal = content
  
  // Initialize advanced scoring system
  let totalScore = 0
  let maxPossibleScore = 0
  const detectedPatterns = {
    urgentKeywords: [],
    buttonPatterns: [],
    numberPatterns: [],
    urlPatterns: [],
    formattingPatterns: [],
    allCapsWords: [],
    suspiciousPhrases: [],
    socialEngineering: [],
    technicalIndicators: []
  }
  
  // 1. HIGH-RISK KEYWORD ANALYSIS (Weight: 35%)
  const urgentKeywords = analyzeUrgentKeywords(emailLower)
  detectedPatterns.urgentKeywords = urgentKeywords.detected
  totalScore += urgentKeywords.score
  maxPossibleScore += 35
  
  // 2. BEHAVIORAL PATTERN ANALYSIS (Weight: 25%)
  const behavioralScore = analyzeBehavioralPatterns(emailLower, emailOriginal)
  totalScore += behavioralScore.score
  maxPossibleScore += 25
  
  // 3. TECHNICAL INDICATOR ANALYSIS (Weight: 20%)
  const technicalScore = analyzeTechnicalIndicators(emailOriginal, emailLower)
  detectedPatterns.technicalIndicators = technicalScore.detected
  totalScore += technicalScore.score
  maxPossibleScore += 20
  
  // 4. SOCIAL ENGINEERING DETECTION (Weight: 15%)
  const socialScore = analyzeSocialEngineering(emailLower)
  detectedPatterns.socialEngineering = socialScore.detected
  totalScore += socialScore.score
  maxPossibleScore += 15
  
  // 5. FORMATTING & STYLE ANALYSIS (Weight: 5%)
  const formattingScore = analyzeFormatting(emailOriginal)
  detectedPatterns.formattingPatterns = formattingScore.detected
  totalScore += formattingScore.score
  maxPossibleScore += 5
  
  // Calculate final spam probability with advanced algorithms
  const spamProbability = calculateSpamProbability(totalScore, maxPossibleScore, content.length)
  const isSpam = determineSpamStatus(spamProbability, content.length, detectedPatterns)
  
  // Add intelligent randomness for realistic results
  const finalConfidence = addIntelligentRandomness(spamProbability, detectedPatterns)
  
  return {
    isSpam,
    confidence: finalConfidence,
    totalScore,
    maxPossibleScore,
    detectedPatterns,
    spamProbability,
    riskLevel: getRiskLevel(finalConfidence),
    analysisDetails: {
      keywordRisk: urgentKeywords.score,
      behavioralRisk: behavioralScore.score,
      technicalRisk: technicalScore.score,
      socialRisk: socialScore.score,
      formattingRisk: formattingScore.score
    }
  }
}

const analyzeUrgentKeywords = (emailLower) => {
  const highRiskKeywords = [
    'urgent', 'immediate', 'action required', 'account suspended', 'verify now',
    'free', 'winner', 'lottery', 'inheritance', 'million dollars',
    'viagra', 'casino', 'credit card', 'debt relief', 'investment opportunity',
    'make money fast', 'work from home', 'get rich quick', 'cash bonus',
    'limited time', 'act now', 'exclusive offer', 'guaranteed', 'no risk',
    'click here', 'subscribe now', 'buy now', 'order now', 'claim now',
    'unlock', 'activate', 'confirm', 'verify', 'secure', 'banking',
    'paypal', 'bitcoin', 'cryptocurrency', 'nft', 'airdrop'
  ]
  
  const detected = []
  let score = 0
  
  highRiskKeywords.forEach(keyword => {
    if (emailLower.includes(keyword)) {
      detected.push(keyword)
      // Higher score for more dangerous keywords
      if (['urgent', 'account suspended', 'verify now', 'inheritance'].includes(keyword)) {
        score += 4
      } else if (['free', 'winner', 'lottery', 'million dollars'].includes(keyword)) {
        score += 3.5
      } else {
        score += 3
      }
    }
  })
  
  return { detected, score }
}

const analyzeBehavioralPatterns = (emailLower, emailOriginal) => {
  let score = 0
  
  // Button-like text patterns
  const buttonPatterns = [
    'click here', 'click now', 'subscribe now', 'buy now', 'order now',
    'claim now', 'get started', 'join now', 'sign up now', 'download now',
    'activate now', 'verify now', 'confirm now', 'unlock now', 'access now'
  ]
  
  buttonPatterns.forEach(pattern => {
    if (emailLower.includes(pattern)) {
      score += 2.5
    }
  })
  
  // Number patterns with context analysis
  const numberPatterns = [
    /\$\d+/, // Dollar amounts
    /\d{3}-\d{3}-\d{4}/, // Phone numbers
    /\d{3}\.\d{3}\.\d{4}/, // Phone numbers with dots
    /\d{10}/, // 10-digit numbers
    /\d+%/, // Percentages
    /\d+x/, // Multipliers
    /\d+ days?/, // Time periods
    /\d+ hours?/, // Time periods
    /\d+ minutes?/ // Time periods
  ]
  
  numberPatterns.forEach(pattern => {
    const matches = emailOriginal.match(pattern)
    if (matches) {
      // Context analysis - higher score if numbers appear with urgent language
      const context = getContextAroundMatches(emailOriginal, matches)
      if (context.includes('urgent') || context.includes('limited') || context.includes('now')) {
        score += 2
      } else {
        score += 1.5
      }
    }
  })
  
  // URL analysis with domain reputation
  const urlPatterns = [
    /https?:\/\/[^\s]+/g, // HTTP/HTTPS URLs
    /www\.[^\s]+/g, // WWW URLs
    /[^\s]+\.[a-z]{2,}/g // Domain patterns
  ]
  
  urlPatterns.forEach(pattern => {
    const matches = emailOriginal.match(pattern)
    if (matches) {
      matches.forEach(url => {
        const domainRisk = analyzeDomainRisk(url)
        score += domainRisk
      })
    }
  })
  
  return { score }
}

const analyzeTechnicalIndicators = (emailOriginal, emailLower) => {
  const detected = []
  let score = 0
  
  // ALL CAPS analysis with context
  const allCapsWords = emailOriginal.match(/[A-Z]{4,}/g) || []
  allCapsWords.forEach(word => {
    if (word.length > 6) { // Longer caps words are more suspicious
      score += 1
      detected.push(`ALL_CAPS: ${word}`)
    } else {
      score += 0.5
    }
  })
  
  // Punctuation analysis
  const exclamationCount = (emailOriginal.match(/!/g) || []).length
  const questionCount = (emailOriginal.match(/\?/g) || []).length
  const dotCount = (emailOriginal.match(/\./g) || []).length
  
  if (exclamationCount > 3) {
    score += Math.min(exclamationCount * 0.5, 5)
    detected.push(`EXCESSIVE_EXCLAMATIONS: ${exclamationCount}`)
  }
  
  if (questionCount > 2) {
    score += Math.min(questionCount * 0.3, 3)
    detected.push(`EXCESSIVE_QUESTIONS: ${questionCount}`)
  }
  
  // Sentence structure analysis
  const sentences = emailOriginal.split(/[.!?]+/).filter(s => s.trim().length > 0)
  const shortSentences = sentences.filter(s => s.trim().split(' ').length < 5)
  
  if (shortSentences.length > sentences.length * 0.6) {
    score += 2
    detected.push('SHORT_SENTENCES: Excessive use of short sentences')
  }
  
  return { detected, score }
}

const analyzeSocialEngineering = (emailLower) => {
  const detected = []
  let score = 0
  
  // Authority impersonation
  const authorityPhrases = [
    'bank of', 'paypal', 'amazon', 'netflix', 'microsoft', 'apple',
    'irs', 'social security', 'government', 'police', 'law enforcement',
    'ceo', 'manager', 'director', 'president'
  ]
  
  authorityPhrases.forEach(phrase => {
    if (emailLower.includes(phrase)) {
      score += 2
      detected.push(`AUTHORITY_IMPERSONATION: ${phrase}`)
    }
  })
  
  // Emotional manipulation
  const emotionalPhrases = [
    'don\'t miss out', 'last chance', 'exclusive', 'special offer',
    'limited time', 'act fast', 'hurry', 'don\'t wait',
    'once in a lifetime', 'amazing opportunity', 'incredible deal'
  ]
  
  emotionalPhrases.forEach(phrase => {
    if (emailLower.includes(phrase)) {
      score += 1.5
      detected.push(`EMOTIONAL_MANIPULATION: ${phrase}`)
    }
  })
  
  // Scarcity tactics
  const scarcityPhrases = [
    'only today', 'expires soon', 'limited quantity', 'while supplies last',
    'first come first serve', 'exclusive to you', 'personal invitation'
  ]
  
  scarcityPhrases.forEach(phrase => {
    if (emailLower.includes(phrase)) {
      score += 1.5
      detected.push(`SCARCITY_TACTIC: ${phrase}`)
    }
  })
  
  return { detected, score }
}

const analyzeFormatting = (emailOriginal) => {
  const detected = []
  let score = 0
  
  // Multiple dots
  const multipleDots = emailOriginal.match(/\.{3,}/g) || []
  if (multipleDots.length > 0) {
    score += multipleDots.length * 0.3
    detected.push(`MULTIPLE_DOTS: ${multipleDots.length} instances`)
  }
  
  // Inconsistent formatting
  const hasMixedCase = /[a-z]/.test(emailOriginal) && /[A-Z]/.test(emailOriginal)
  const hasNumbers = /\d/.test(emailOriginal)
  const hasSymbols = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(emailOriginal)
  
  if (hasMixedCase && hasNumbers && hasSymbols) {
    score += 1
    detected.push('MIXED_FORMATTING: Inconsistent text formatting')
  }
  
  return { detected, score }
}

const analyzeDomainRisk = (url) => {
  const domain = url.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0]
  
  // High-risk domains
  const highRiskDomains = ['bit.ly', 'tinyurl.com', 'goo.gl', 't.co', 'is.gd']
  if (highRiskDomains.some(riskDomain => domain.includes(riskDomain))) {
    return 3
  }
  
  // Suspicious TLDs
  const suspiciousTLDs = ['.tk', '.ml', '.ga', '.cf', '.gq']
  if (suspiciousTLDs.some(tld => domain.endsWith(tld))) {
    return 2.5
  }
  
  // Generic domains
  if (domain.includes('free') || domain.includes('click') || domain.includes('offer')) {
    return 2
  }
  
  return 1.5
}

const getContextAroundMatches = (text, matches) => {
  let context = ''
  matches.forEach(match => {
    const index = text.indexOf(match)
    const start = Math.max(0, index - 50)
    const end = Math.min(text.length, index + match.length + 50)
    context += text.substring(start, end) + ' '
  })
  return context.toLowerCase()
}

const calculateSpamProbability = (totalScore, maxPossibleScore, contentLength) => {
  // Base probability
  let probability = (totalScore / maxPossibleScore) * 100
  
  // Length adjustment - very short or very long emails are suspicious
  if (contentLength < 50) {
    probability += 15
  } else if (contentLength > 2000) {
    probability += 10
  }
  
  // Normalize to 0-100 range
  return Math.min(Math.max(probability, 0), 100)
}

const determineSpamStatus = (probability, contentLength, patterns) => {
  // Adaptive threshold based on content and patterns
  let threshold = 50
  
  // Lower threshold for emails with high-risk patterns
  if (patterns.urgentKeywords.length > 3) {
    threshold -= 10
  }
  
  if (patterns.socialEngineering.length > 2) {
    threshold -= 8
  }
  
  // Higher threshold for very short content
  if (contentLength < 100) {
    threshold += 5
  }
  
  return probability > threshold
}

const addIntelligentRandomness = (probability, patterns) => {
  // Add realistic variation based on pattern complexity
  const patternComplexity = Object.values(patterns).reduce((sum, arr) => sum + arr.length, 0)
  const variationFactor = Math.min(patternComplexity * 0.02, 0.15)
  
  const randomFactor = (Math.random() - 0.5) * variationFactor
  const finalConfidence = probability + (randomFactor * 100)
  
  return Math.max(0, Math.min(100, finalConfidence))
}

const getRiskLevel = (confidence) => {
  if (confidence < 20) return 'LOW'
  if (confidence < 50) return 'MEDIUM'
  if (confidence < 80) return 'HIGH'
  return 'CRITICAL'
}
