import React, { useState, useRef } from 'react'

const EmailInput = ({ 
  emailContent, 
  setEmailContent, 
  isAnalyzing, 
  onAnalyzeText,
  onAnalyzeImages,
  onAnalyzeBoth,
  onClear,
  images,
  setImages,
  onRemoveImage
}) => {
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef(null)

  const handleDrag = (e) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files)
    }
  }

  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => 
      file.type.startsWith('image/') && file.size <= 10 * 1024 * 1024 // 10MB limit
    )
    
    if (validFiles.length > 0) {
      const newImages = validFiles.map(file => ({
        id: Date.now() + Math.random(),
        file,
        preview: URL.createObjectURL(file),
        name: file.name,
        size: file.size
      }))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files)
    }
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const canAnalyzeText = emailContent.trim().length > 0
  const canAnalyzeImages = images.length > 0
  const canAnalyzeBoth = canAnalyzeText && canAnalyzeImages

  return (
    <div className="relative group">
      {/* Futuristic background with animated effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-blue-50/20 to-cyan-50/20 dark:from-gray-800/80 dark:via-blue-900/20 dark:to-cyan-900/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-cyan-500/25 dark:group-hover:shadow-cyan-400/25 pointer-events-none">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse opacity-30 pointer-events-none"></div>
        
        {/* Floating particles */}
        <div className="absolute top-4 right-6 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60 pointer-events-none"></div>
        <div className="absolute bottom-8 left-8 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping opacity-60 pointer-events-none" style={{animationDelay: '1s'}}></div>
      </div>

      <div className="relative p-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-cyan-600 dark:from-white dark:via-blue-300 dark:to-cyan-300 bg-clip-text text-transparent mb-6 drop-shadow-lg">
          Email Content Analysis
        </h2>
        
        <div className="space-y-6">
          {/* Email Input Section */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 tracking-wide uppercase">
              Email Subject & Content
            </label>
            <div className="relative group">
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                placeholder="Paste the email content here to analyze for spam..."
                className="w-full h-48 p-6 border-2 border-gray-300/50 dark:border-gray-600/50 rounded-2xl focus:ring-4 focus:ring-cyan-400/30 focus:border-cyan-400 resize-none bg-white/80 dark:bg-gray-700/80 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 transition-all duration-500 backdrop-blur-sm shadow-lg focus:shadow-cyan-500/25 dark:focus:shadow-cyan-400/25 relative z-10"
                disabled={isAnalyzing}
              />
              {/* Animated border glow - make non-interactive */}
              <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-focus-within:border-cyan-400/50 transition-all duration-500 pointer-events-none"></div>
            </div>
          </div>

          {/* Futuristic Image Upload Section */}
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-3 tracking-wide uppercase">
              Attach Images (Optional)
            </label>
            
            {/* Enhanced Drag & Drop Area */}
            <div
              className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-500 backdrop-blur-sm ${
                dragActive 
                  ? 'border-cyan-400 bg-cyan-50/30 dark:bg-cyan-900/20 shadow-lg shadow-cyan-400/25' 
                  : 'border-gray-300/50 dark:border-gray-600/50 hover:border-cyan-400/50 dark:hover:border-cyan-400/50 hover:bg-cyan-50/10 dark:hover:bg-cyan-900/10'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              {/* Animated background */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-50/20 to-blue-50/20 dark:from-cyan-900/10 dark:to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              
              <div className="relative space-y-4">
                <div className="relative">
                  <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 transition-colors duration-300" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                    <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  {/* Upload icon glow */}
                  <div className="absolute inset-0 h-16 w-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none"></div>
                </div>
                
                <div className="text-gray-600 dark:text-gray-400 transition-colors duration-300">
                  <button
                    type="button"
                    onClick={openFileDialog}
                    className="text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-bold transition-all duration-300 hover:scale-105"
                  >
                    Click to upload
                  </button>
                  {' '}or drag and drop
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500 transition-colors duration-300">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>

            {/* Hidden file input */}
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleFileInput}
              className="hidden"
            />
          </div>

          {/* Enhanced Image Preview */}
          {images.length > 0 && (
            <div className="space-y-4">
              <h4 className="text-sm font-bold text-gray-700 dark:text-gray-300 transition-colors duration-300 tracking-wide uppercase">
                Attached Images ({images.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group">
                    <div className="relative overflow-hidden rounded-xl border-2 border-gray-200/50 dark:border-gray-600/50 transition-all duration-300 group-hover:border-cyan-400/50 group-hover:shadow-lg group-hover:shadow-cyan-400/25">
                      <img
                        src={image.preview}
                        alt={image.name}
                        className="w-full h-24 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>
                    
                    <button
                      onClick={() => onRemoveImage(image.id)}
                      className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-sm hover:from-red-600 hover:to-pink-600 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 shadow-lg"
                      title="Remove image"
                    >
                      ×
                    </button>
                    
                    <div className="mt-2 text-xs text-gray-500 dark:text-gray-400 truncate transition-colors duration-300 text-center">
                      {image.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Futuristic Analysis Buttons */}
          <div className="space-y-4">
            {/* Combined Analysis Button */}
            {canAnalyzeBoth && (
              <button
                onClick={onAnalyzeBoth}
                disabled={isAnalyzing}
                className="w-full relative group bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:via-gray-500 disabled:to-gray-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-500 flex items-center justify-center shadow-2xl hover:shadow-cyan-500/25 disabled:shadow-none overflow-hidden"
              >
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"></div>
                
                {/* Button content */}
                <div className="relative z-10 flex items-center">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white mr-3"></div>
                      <span className="text-lg">Analyzing Both...</span>
                    </>
                  ) : (
                    <>
                      {/* <span className="text-2xl mr-3">🔍</span> */}
                      <span className="text-lg">Analyze Email & Images Together</span>
                    </>
                  )}
                </div>
              </button>
            )}

            {/* Individual Analysis Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Text Analysis Button */}
              <button
                onClick={onAnalyzeText}
                disabled={!canAnalyzeText || isAnalyzing}
                className="relative group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 flex items-center justify-center shadow-xl hover:shadow-blue-500/25 disabled:shadow-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"></div>
                <div className="relative z-10 flex items-center">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze Text </span>
                    </>
                  )}
                </div>
              </button>
              
              {/* Image Analysis Button */}
              <button
                onClick={onAnalyzeImages}
                disabled={!canAnalyzeImages || isAnalyzing}
                className="relative group bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-500 flex items-center justify-center shadow-xl hover:shadow-green-500/25 disabled:shadow-none overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 to-emerald-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl pointer-events-none"></div>
                <div className="relative z-10 flex items-center">
                  {isAnalyzing ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      <span>Analyzing...</span>
                    </>
                  ) : (
                    <>
                      <span>Analyze Images </span>
                    </>
                  )}
                </div>
              </button>
            </div>
            
            {/* Futuristic Clear Button */}
            <button
              onClick={onClear}
              className="w-full px-8 py-4 border-2 border-gray-300/50 dark:border-gray-600/50 text-gray-700 dark:text-gray-300 font-bold rounded-2xl hover:bg-gray-50/50 dark:hover:bg-gray-700/50 hover:border-cyan-400/50 dark:hover:border-cyan-400/50 transition-all duration-500 backdrop-blur-sm hover:shadow-lg hover:shadow-cyan-500/25"
            >
              Clear All
            </button>
          </div>

          {/* Enhanced Analysis Status */}
          {isAnalyzing && (
            <div className="text-center py-4">
              <div className="inline-flex items-center text-lg text-cyan-600 dark:text-cyan-400 transition-colors duration-300">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-cyan-600 dark:border-cyan-400 mr-3"></div>
                <span className="font-semibold">Analysis in progress...</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EmailInput
