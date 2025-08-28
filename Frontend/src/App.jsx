import { useState, useEffect } from 'react'
import './App.css'
import Header from './components/Header'
import EmailInput from './components/EmailInput'
import AnalysisResults from './components/AnalysisResults'
import Features from './components/Features'
import { analyzeEmail } from './utils/spamAnalyzer'
import { analyzeImages } from './utils/imageAnalyzer'

function App() {
  const [emailContent, setEmailContent] = useState('')
  const [images, setImages] = useState([])
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [analysisType, setAnalysisType] = useState(null) // 'text', 'images', 'both'
  const [analysisResult, setAnalysisResult] = useState(null)
  const [imageResults, setImageResults] = useState(null)
  const [confidence, setConfidence] = useState(0)

  // Force dark mode globally
  useEffect(() => {
    document.documentElement.classList.add('dark')
  }, [])

  const handleAnalyzeText = async () => {
    if (!emailContent.trim()) return
    
    setIsAnalyzing(true)
    setAnalysisType('text')
    
    try {
      console.log('Starting text analysis...')
      const result = await analyzeEmail(emailContent)
      console.log('Text analysis result:', result)
      if (result) {
        setConfidence(result.confidence)
        setAnalysisResult(result)
        setImageResults(null) // Clear previous image results
      }
    } catch (error) {
      console.error('Text analysis failed:', error)
      // Show error to user
      alert(`Analysis failed: ${error.message}. Please check if the backend server is running.`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleAnalyzeImages = async () => {
    if (images.length === 0) return
    
    setIsAnalyzing(true)
    setAnalysisType('images')
    
    try {
      console.log('Starting image analysis...')
      const result = await analyzeImages(images)
      console.log('Image analysis result:', result)
      if (result) {
        // Calculate average confidence from all images
        const avgConfidence = result.reduce((sum, img) => sum + (img.analysis?.confidence || 0), 0) / result.length
        setConfidence(avgConfidence)
        setImageResults(result)
        setAnalysisResult(null) // Clear previous text results
      }
    } catch (error) {
      console.error('Image analysis failed:', error)
      // Show error to user
      alert(`Image analysis failed: ${error.message}. Please check if the backend server is running.`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleAnalyzeBoth = async () => {
    if (!emailContent.trim() && images.length === 0) return
    
    setIsAnalyzing(true)
    setAnalysisType('both')
    
    try {
      // Analyze both text and images
      let emailAnalysis = null
      let imageAnalysis = null
      
      if (emailContent.trim()) {
        emailAnalysis = await analyzeEmail(emailContent)
      }
      
      if (images.length > 0) {
        imageAnalysis = await analyzeImages(images)
      }
      
      // Set results
      if (emailAnalysis) {
        setAnalysisResult(emailAnalysis)
        setConfidence(emailAnalysis.confidence)
      }
      
      if (imageAnalysis) {
        setImageResults(imageAnalysis)
        // If no text analysis, use image confidence
        if (!emailAnalysis) {
          const avgImageConfidence = imageAnalysis.reduce((sum, img) => sum + (img.analysis?.confidence || 0), 0) / imageAnalysis.length
          setConfidence(avgImageConfidence)
        }
      }
      
    } catch (error) {
      console.error('Combined analysis failed:', error)
      // Show error to user
      alert(`Combined analysis failed: ${error.message}. Please check if the backend server is running.`)
    } finally {
      setIsAnalyzing(false)
    }
  }

  const handleClearAnalysis = () => {
    setEmailContent('')
    setImages([])
    setAnalysisResult(null)
    setImageResults(null)
    setConfidence(0)
    setAnalysisType(null)
  }

  const handleRemoveImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Futuristic animated background */}
      <div className="fixed inset-0 bg-gradient-to-br from-black via-slate-900 to-blue-900">
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse opacity-20"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-32 h-32 border border-cyan-400/20 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
        <div className="absolute top-40 right-32 w-24 h-24 border border-blue-400/20 rounded-full animate-ping" style={{animationDelay: '2s'}}></div>
        <div className="absolute bottom-32 left-1/3 w-16 h-16 bg-gradient-to-br from-purple-400/10 to-cyan-400/10 rounded-full animate-pulse"></div>
        
        {/* Glowing orbs */}
        <div className="absolute top-1/4 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-purple-400 rounded-full animate-ping opacity-60" style={{animationDelay: '3s'}}></div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <Header />
          
          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            <EmailInput 
              emailContent={emailContent}
              setEmailContent={setEmailContent}
              isAnalyzing={isAnalyzing}
              onAnalyzeText={handleAnalyzeText}
              onAnalyzeImages={handleAnalyzeImages}
              onAnalyzeBoth={handleAnalyzeBoth}
              onClear={handleClearAnalysis}
              images={images}
              setImages={setImages}
              onRemoveImage={handleRemoveImage}
            />
            
            <AnalysisResults 
              analysisResult={analysisResult} 
              imageResults={imageResults}
              analysisType={analysisType}
            />
          </div>

          <Features />
        </div>
      </div>
    </div>
  )
}

export default App