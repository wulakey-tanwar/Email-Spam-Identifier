import React from 'react'

const AnalysisResults = ({ analysisResult, imageResults, analysisType }) => {
  const getConfidenceColor = (confidence) => {
    if (confidence < 30) return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400'
    if (confidence < 60) return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400'
    return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400'
  }

  const getRiskLevelColor = (riskLevel) => {
    switch (riskLevel) {
      case 'LOW': return 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400'
      case 'MEDIUM': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'HIGH': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20 dark:text-orange-400'
      case 'CRITICAL': return 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400'
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300'
    }
  }

  const getSpamStatusColor = (isSpam) => {
    return isSpam ? 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400' : 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400'
  }

  const getAnalysisTypeInfo = () => {
    switch (analysisType) {
      case 'text':
        return {
          icon: '📝',
          title: 'Text Analysis',
          description: 'Email content analyzed for spam patterns'
        }
      case 'images':
        return {
          icon: '🖼️',
          title: 'Image Analysis',
          description: 'Images analyzed for suspicious visual patterns'
        }
      case 'both':
        return {
          icon: '🔍',
          title: 'Combined Analysis',
          description: 'Both text and images analyzed together'
        }
      default:
        return null
    }
  }

  const generateRecommendations = (result) => {
    const recommendations = []
    const patterns = result.detectedPatterns || {}
    
    if (result.isSpam) {
      // High spam confidence - urgent actions needed
      recommendations.push({
        priority: 'high',
        icon: '🚨',
        text: 'Delete this email immediately without opening any attachments',
        category: 'urgent'
      })
      
      recommendations.push({
        priority: 'high',
        icon: '🔒',
        text: 'Do not click on any links or reply to the sender',
        category: 'urgent'
      })
      
      recommendations.push({
        priority: 'high',
        icon: '📧',
        text: 'Report as spam in your email client to improve future detection',
        category: 'urgent'
      })
      
      // Pattern-specific recommendations
      if (patterns.urgentKeywords && patterns.urgentKeywords.length > 0) {
        recommendations.push({
          priority: 'medium',
          icon: '⚠️',
          text: 'High-risk keywords detected - be extremely cautious of urgent requests',
          category: 'pattern'
        })
      }
      
      if (patterns.socialEngineering && patterns.socialEngineering.length > 0) {
        recommendations.push({
          priority: 'high',
          icon: '🎭',
          text: 'Social engineering tactics detected - verify sender identity independently',
          category: 'social'
        })
      }
      
      if (patterns.urlPatterns && patterns.urlPatterns.length > 0) {
        recommendations.push({
          priority: 'medium',
          icon: '🔗',
          text: 'Suspicious URLs detected - never click on unknown links',
          category: 'pattern'
        })
      }
      
      if (patterns.numberPatterns && patterns.numberPatterns.length > 0) {
        recommendations.push({
          priority: 'medium',
          icon: '💰',
          text: 'Financial numbers detected - verify any monetary claims independently',
          category: 'pattern'
        })
      }
      
      // General spam advice
      recommendations.push({
        priority: 'medium',
        icon: '🛡️',
        text: 'Enable two-factor authentication on your accounts for extra security',
        category: 'general'
      })
      
      recommendations.push({
        priority: 'medium',
        icon: '📱',
        text: 'Contact the supposed sender through official channels to verify',
        category: 'general'
      })
      
    } else if (result.confidence > 30) {
      // Medium confidence - exercise caution
      recommendations.push({
        priority: 'medium',
        icon: '⚠️',
        text: 'Exercise caution - some suspicious patterns were detected',
        category: 'caution'
      })
      
      if (patterns.urgentKeywords && patterns.urgentKeywords.length > 0) {
        recommendations.push({
          priority: 'medium',
          icon: '⏰',
          text: 'Urgent language detected - verify time-sensitive requests',
          category: 'pattern'
        })
      }
      
      if (patterns.urlPatterns && patterns.urlPatterns.length > 0) {
        recommendations.push({
          priority: 'medium',
          icon: '🔍',
          text: 'Links detected - hover over URLs to verify destination before clicking',
          category: 'pattern'
        })
      }
      
      recommendations.push({
        priority: 'medium',
        icon: '✅',
        text: 'Verify sender identity through official contact information',
        category: 'verification'
      })
      
    } else {
      // Low confidence - likely legitimate
      recommendations.push({
        priority: 'low',
        icon: '✅',
        text: 'This email appears to be legitimate based on our analysis',
        category: 'positive'
      })
      
      recommendations.push({
        priority: 'low',
        icon: '📎',
        text: 'Exercise normal caution with any attachments',
        category: 'general'
      })
      
      recommendations.push({
        priority: 'low',
        icon: '🔒',
        text: 'Always verify sender identity if you have any doubts',
        category: 'verification'
      })
    }
    
    // Add general security recommendations for all cases
    recommendations.push({
      priority: 'low',
      icon: '🔄',
      text: 'Keep your email client and security software updated',
      category: 'maintenance'
    })
    
    recommendations.push({
      priority: 'low',
      icon: '📚',
      text: 'Stay informed about common phishing and spam tactics',
      category: 'education'
    })
    
    return recommendations
  }

  const generateImageRecommendations = (imageResults) => {
    if (!imageResults || imageResults.length === 0) return []
    
    const recommendations = []
    const spamImages = imageResults.filter(img => img.analysis.isSpam)
    
    if (spamImages.length > 0) {
      recommendations.push({
        priority: 'high',
        icon: '🖼️',
        text: `${spamImages.length} suspicious image(s) detected - do not trust content`,
        category: 'image'
      })
      
      recommendations.push({
        priority: 'medium',
        icon: '👁️',
        text: 'Images may contain hidden text or malicious visual patterns',
        category: 'image'
      })
    }
    
    if (imageResults.length > 0) {
      recommendations.push({
        priority: 'medium',
        icon: '🔍',
        text: 'Always verify image content independently of email claims',
        category: 'image'
      })
    }
    
    return recommendations
  }

  if (!analysisType) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
          Analysis Results
        </h2>
        <div className="text-center py-12">
          <div className="text-gray-400 dark:text-gray-500 mb-4 transition-colors duration-300">
            <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <p className="text-gray-500 dark:text-gray-400 transition-colors duration-300">Choose an analysis type to get started</p>
          <div className="mt-4 space-y-2 text-sm text-gray-400 dark:text-gray-500 transition-colors duration-300">
            <p>📝 <strong>Text Analysis:</strong> Analyze email content for spam patterns</p>
            <p>🖼️ <strong>Image Analysis:</strong> Detect suspicious visual elements</p>
            <p>🔍 <strong>Combined Analysis:</strong> Analyze both together for comprehensive results</p>
          </div>
        </div>
      </div>
    )
  }

  const emailRecommendations = analysisResult ? generateRecommendations(analysisResult) : []
  const imageRecommendations = generateImageRecommendations(imageResults)
  const allRecommendations = [...emailRecommendations, ...imageRecommendations]
  const analysisInfo = getAnalysisTypeInfo()

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 transition-colors duration-300">
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4 transition-colors duration-300">
        Analysis Results
      </h2>
      
      {/* Analysis Type Header */}
      {analysisInfo && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 mb-4 transition-colors duration-300">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{analysisInfo.icon}</span>
            <div>
              <h3 className="font-semibold text-blue-800 dark:text-blue-300 transition-colors duration-300">{analysisInfo.title}</h3>
              <p className="text-sm text-blue-600 dark:text-blue-400 transition-colors duration-300">{analysisInfo.description}</p>
            </div>
          </div>
        </div>
      )}
      
      <div className="space-y-4">
        {/* Combined Spam Status */}
        {(analysisResult || (imageResults && imageResults.length > 0)) && (
          <div className="text-center p-4 rounded-lg border border-gray-200 dark:border-gray-600 transition-colors duration-300">
            <div className={`inline-block px-4 py-2 rounded-full text-sm font-semibold ${
              (analysisResult?.isSpam || (imageResults && imageResults.some(img => img.analysis.isSpam))) 
                ? 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400' 
                : 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400'
            }`}>
              {(analysisResult?.isSpam || (imageResults && imageResults.some(img => img.analysis.isSpam))) 
                ? '🚨 SPAM DETECTED' 
                : '✅ LEGITIMATE CONTENT'}
            </div>
          </div>
        )}

        {/* Email Analysis Results */}
        {analysisResult && (
          <>
            {/* Risk Level & Confidence */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Risk Level</span>
                  <span className={`text-sm font-semibold ${getRiskLevelColor(analysisResult.riskLevel)}`}>
                    {analysisResult.riskLevel}
                  </span>
                </div>
              </div>
              
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">Spam Confidence</span>
                  <span className={`text-sm font-semibold ${getConfidenceColor(analysisResult.confidence)}`}>
                    {analysisResult.confidence.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 transition-colors duration-300">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      analysisResult.confidence < 30 ? 'bg-green-500' : 
                      analysisResult.confidence < 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${analysisResult.confidence}%` }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Advanced Analysis Breakdown */}
            {analysisResult.analysisDetails && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 transition-colors duration-300">
                <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-3 transition-colors duration-300">🔍 Advanced Analysis Breakdown</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300">{(analysisResult.analysisDetails.keywordRisk || 0).toFixed(1)}</div>
                    <div className="text-xs text-blue-500 dark:text-blue-400 transition-colors duration-300">Keyword Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300">{(analysisResult.analysisDetails.behavioralRisk || 0).toFixed(1)}</div>
                    <div className="text-xs text-blue-500 dark:text-blue-400 transition-colors duration-300">Behavioral Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300">{(analysisResult.analysisDetails.technicalRisk || 0).toFixed(1)}</div>
                    <div className="text-xs text-blue-500 dark:text-blue-400 transition-colors duration-300">Technical Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300">{(analysisResult.analysisDetails.socialRisk || 0).toFixed(1)}</div>
                    <div className="text-xs text-blue-500 dark:text-blue-400 transition-colors duration-300">Social Risk</div>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-semibold text-blue-600 dark:text-blue-400 transition-colors duration-300">{(analysisResult.analysisDetails.formattingRisk || 0).toFixed(1)}</div>
                    <div className="text-xs text-blue-500 dark:text-blue-400 transition-colors duration-300">Formatting Risk</div>
                  </div>
                </div>
              </div>
            )}

            {/* Score Breakdown */}
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
              <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">Detection Score</h3>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Spam indicators found: {(analysisResult.totalScore || 0).toFixed(1)}</span>
                <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Max possible score: {(analysisResult.maxPossibleScore || 100).toFixed(1)}</span>
              </div>
            </div>

            {/* Enhanced Pattern Detection */}
            <div className="space-y-3">
              {/* Urgent Keywords */}
              {analysisResult.detectedPatterns?.urgentKeywords?.length > 0 && (
                <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4 transition-colors duration-300">
                  <h3 className="font-medium text-red-700 dark:text-red-400 mb-2 transition-colors duration-300">🚨 High-Risk Keywords</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.detectedPatterns.urgentKeywords.map((keyword, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-300 text-xs rounded-full font-medium transition-colors duration-300"
                      >
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Social Engineering */}
              {analysisResult.detectedPatterns?.socialEngineering?.length > 0 && (
                <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4 transition-colors duration-300">
                  <h3 className="font-medium text-purple-700 dark:text-purple-400 mb-2 transition-colors duration-300">🎭 Social Engineering Tactics</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.detectedPatterns.socialEngineering.map((tactic, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-purple-100 dark:bg-purple-800 text-purple-700 dark:text-purple-300 text-xs rounded-full font-medium transition-colors duration-300"
                      >
                        {tactic}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Technical Indicators */}
              {analysisResult.detectedPatterns?.technicalIndicators?.length > 0 && (
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-lg p-4 transition-colors duration-300">
                  <h3 className="font-medium text-orange-700 dark:text-orange-400 mb-2 transition-colors duration-300">⚙️ Technical Indicators</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.detectedPatterns.technicalIndicators.map((indicator, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-orange-100 dark:bg-orange-800 text-orange-700 dark:text-orange-300 text-xs rounded-full font-medium transition-colors duration-300"
                      >
                        {indicator}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Button Patterns */}
              {analysisResult.detectedPatterns?.buttonPatterns?.length > 0 && (
                <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 transition-colors duration-300">
                  <h3 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2 transition-colors duration-300">🔘 Button-like Text</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.detectedPatterns.buttonPatterns.map((pattern, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-yellow-100 dark:bg-yellow-800 text-yellow-700 dark:text-yellow-300 text-xs rounded-full font-medium transition-colors duration-300"
                      >
                        {pattern}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Number Patterns */}
              {analysisResult.detectedPatterns?.numberPatterns?.length > 0 && (
                <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4 transition-colors duration-300">
                  <h3 className="font-medium text-indigo-700 dark:text-indigo-400 mb-2 transition-colors duration-300">🔢 Suspicious Numbers</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.detectedPatterns.numberPatterns.map((number, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-indigo-100 dark:bg-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs rounded-full font-medium transition-colors duration-300"
                      >
                        {number}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* URL Patterns */}
              {analysisResult.detectedPatterns?.urlPatterns?.length > 0 && (
                <div className="bg-pink-50 dark:bg-pink-900/20 rounded-lg p-4 transition-colors duration-300">
                  <h3 className="font-medium text-pink-700 dark:text-pink-400 mb-2 transition-colors duration-300">🔗 URLs & Links</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.detectedPatterns.urlPatterns.map((url, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-pink-100 dark:bg-pink-800 text-pink-700 dark:text-pink-300 text-xs rounded-full font-medium break-all transition-colors duration-300"
                      >
                        {url}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* ALL CAPS Words */}
              {analysisResult.detectedPatterns?.allCapsWords?.length > 0 && (
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 transition-colors duration-300">
                  <h3 className="font-medium text-blue-700 dark:text-blue-400 mb-2 transition-colors duration-300">📢 ALL CAPS Words</h3>
                  <div className="flex flex-wrap gap-2">
                    {analysisResult.detectedPatterns.allCapsWords.map((word, index) => (
                      <span 
                        key={index}
                        className="px-2 py-1 bg-blue-100 dark:bg-blue-800 text-blue-700 dark:text-blue-300 text-xs rounded-full font-medium transition-colors duration-300"
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Image Analysis Results */}
        {imageResults && imageResults.length > 0 && (
          <div className="space-y-3">
            <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2 transition-colors duration-300">🖼️ Image Analysis Results</h3>
            
            {imageResults.map((imageResult, index) => (
              <div key={imageResult.imageId} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 transition-colors duration-300">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">{imageResult.fileName}</h4>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    imageResult.analysis.isSpam ? 'text-red-600 bg-red-100 dark:bg-red-900/20 dark:text-red-400' : 'text-green-600 bg-green-100 dark:bg-green-900/20 dark:text-green-400'
                  }`}>
                    {imageResult.analysis.isSpam ? 'SUSPICIOUS' : 'CLEAN'}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400 transition-colors duration-300">Image Spam Confidence:</span>
                    <span className={`font-semibold ${getConfidenceColor(imageResult.analysis.confidence || 0)}`}>
                      {(imageResult.analysis.confidence || 0).toFixed(1)}%
                    </span>
                  </div>
                  
                  {imageResult.analysis.detectedPatterns && imageResult.analysis.detectedPatterns.length > 0 && (
                    <div className="space-y-2">
                      <span className="text-xs font-medium text-gray-600 dark:text-gray-400 transition-colors duration-300">Detected Patterns:</span>
                      {imageResult.analysis.detectedPatterns.map((pattern, pIndex) => (
                        <div key={pIndex} className="bg-white dark:bg-gray-600 rounded p-2 text-xs transition-colors duration-300">
                          <div className="font-medium text-gray-700 dark:text-gray-300 transition-colors duration-300">{pattern.description}</div>
                          <div className="text-gray-500 dark:text-gray-400 transition-colors duration-300">
                            Score: {(pattern.score || 0).toFixed(1)} | 
                            {pattern.details && Object.entries(pattern.details).map(([key, value]) => (
                              <span key={key} className="ml-2">{key}: {value}</span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Enhanced Recommendations */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-lg p-4 transition-colors duration-300">
          <h3 className="font-medium text-blue-700 dark:text-blue-300 mb-3 transition-colors duration-300">🎯 Smart Recommendations</h3>
          <div className="space-y-2">
            {allRecommendations.map((rec, index) => (
              <div 
                key={index}
                className={`flex items-start gap-2 p-2 rounded-lg transition-colors duration-300 ${
                  rec.priority === 'high' ? 'bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400' :
                  rec.priority === 'medium' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400' :
                  'bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400'
                }`}
              >
                <span className="text-lg">{rec.icon}</span>
                <span className={`text-sm ${
                  rec.priority === 'high' ? 'text-red-700 dark:text-red-300' :
                  rec.priority === 'medium' ? 'text-yellow-700 dark:text-yellow-300' :
                  'text-green-700 dark:text-green-300'
                }`}>
                  {rec.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisResults
