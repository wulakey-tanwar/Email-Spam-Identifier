import React from 'react'

const Features = () => {
  const features = [
    {
      icon: '🔍',
      title: 'Advanced Pattern Recognition',
      description: 'AI-powered detection of sophisticated spam patterns, including social engineering tactics and visual elements in images.'
    },
    {
      icon: '⚡',
      title: 'Real-time Analysis',
      description: 'Instant analysis of both email content and attached images with comprehensive spam detection algorithms.'
    },
    {
      icon: '🛡️',
      title: 'Privacy First',
      description: 'Your data never leaves your device. All analysis is performed locally with advanced security measures.'
    },
    {
      icon: '📊',
      title: 'Detailed Insights',
      description: 'Get comprehensive breakdowns of detected patterns, risk levels, and actionable recommendations.'
    },
    {
      icon: '🎯',
      title: 'Smart Recommendations',
      description: 'AI-generated advice based on detected patterns to help you make informed decisions about email safety.'
    },
    {
      icon: '🔄',
      title: 'Continuous Learning',
      description: 'Our system adapts and improves based on new spam patterns and user feedback.'
    }
  ]

  const imageFeatures = [
    {
      icon: '👁️',
      title: 'Visual Pattern Detection',
      description: 'Advanced image analysis to detect suspicious visual elements, hidden text, and malicious patterns.'
    },
    {
      icon: '🔍',
      title: 'Text Pattern Recognition',
      description: 'Extract and analyze text content from images to identify spam and phishing attempts.'
    }
  ]

  return (
    <div className="mt-16 space-y-12">
      {/* Main Features */}
      <div>
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-white via-cyan-200 to-blue-200 dark:from-white dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent mb-12 drop-shadow-lg">
          Key Features
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Futuristic card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-blue-50/20 to-cyan-50/20 dark:from-gray-800/80 dark:via-blue-900/20 dark:to-cyan-900/20 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-cyan-500/25 dark:group-hover:shadow-cyan-400/25 group-hover:scale-105">
                {/* Animated grid pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.05)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse opacity-30"></div>
                
                {/* Floating particles */}
                <div className="absolute top-3 right-3 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-3 left-3 w-0.5 h-0.5 bg-blue-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
              </div>

              <div className="relative p-8 text-center">
                <div className="text-6xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-cyan-600 dark:from-white dark:via-blue-300 dark:to-cyan-300 bg-clip-text text-transparent mb-4 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed transition-colors duration-300 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Image Analysis Features */}
      <div>
        <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-white via-cyan-200 to-blue-200 dark:from-white dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent mb-12 drop-shadow-lg">
          Advanced Image Analysis
        </h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {imageFeatures.map((feature, index) => (
            <div 
              key={index}
              className="relative group"
            >
              {/* Enhanced card background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-50/30 via-blue-50/30 to-indigo-50/30 dark:from-cyan-900/30 dark:via-blue-900/30 dark:to-indigo-900/30 backdrop-blur-xl border border-cyan-200/30 dark:border-cyan-700/30 rounded-2xl shadow-2xl transition-all duration-500 group-hover:shadow-cyan-500/25 dark:group-hover:shadow-cyan-400/25 group-hover:scale-105">
                {/* Animated cyan grid */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(34,211,238,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(34,211,238,0.1)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse opacity-40"></div>
                
                {/* Cyan particles */}
                <div className="absolute top-4 right-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
              </div>

              <div className="relative p-8 text-center">
                <div className="text-6xl mb-6 transform transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-bold bg-gradient-to-r from-cyan-600 via-blue-600 to-indigo-600 dark:from-cyan-300 dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent mb-4 transition-all duration-300">
                  {feature.title}
                </h3>
                <p className="text-cyan-700 dark:text-cyan-300 leading-relaxed transition-colors duration-300 font-medium">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Futuristic Technology Stack */}
      <div className="text-center">
        <h3 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 dark:from-white dark:via-cyan-300 dark:to-blue-300 bg-clip-text text-transparent mb-8 drop-shadow-lg">
          Powered by Advanced AI/ML Technology
        </h3>
        <div className="flex flex-wrap justify-center gap-4">
          {[
            'Machine Learning',
            'Computer Vision', 
            'Natural Language Processing',
            'Pattern Recognition',
            'Real-time Analysis'
          ].map((tech, index) => (
            <div
              key={index}
              className="relative group px-6 py-3 bg-gradient-to-r from-gray-800/50 to-gray-700/50 dark:from-gray-700/50 dark:to-gray-600/50 backdrop-blur-sm text-gray-300 dark:text-gray-400 rounded-2xl border border-white/20 dark:border-white/10 transition-all duration-500 hover:from-cyan-900/50 hover:to-blue-900/50 hover:text-cyan-200 dark:hover:text-cyan-200 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/25"
            >
              <span className="relative z-10 font-semibold tracking-wide">{tech}</span>
              {/* Hover glow effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/20 to-blue-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Futuristic decorative elements */}
      <div className="relative">
        <div className="absolute left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent rounded-full opacity-60"></div>
        <div className="absolute left-1/2 transform -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent rounded-full opacity-40 mt-2"></div>
      </div>
    </div>
  )
}

export default Features
