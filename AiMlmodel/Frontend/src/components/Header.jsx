import React from 'react'

const Header = () => {
  return (
    <nav className="relative mb-8 overflow-hidden">
      {/* Background with animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/40 via-purple-900/40 to-cyan-900/40 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl">
        {/* Animated grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse"></div>
        
        {/* Floating orbs */}
        <div className="absolute top-4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-8 right-1/3 w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping opacity-60" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-6 left-1/3 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="relative max-w-4xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            {/* Futuristic Logo */}
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-400/25">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              {/* Glow effect */}
              <div className="absolute inset-0 w-12 h-12 bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 rounded-xl blur-xl opacity-30 animate-pulse"></div>
            </div>
            
            <div className="space-y-1">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent drop-shadow-lg">
                AI Email Spam Identifier
              </h1>
              <p className="text-sm text-gray-400 font-medium tracking-wide">
                Advanced machine learning-powered email analysis
              </p>
            </div>
          </div>

          {/* Right Side - Status Only */}
          <div className="flex items-center space-x-6">
            {/* Futuristic Status Indicator */}
            <div className="hidden md:flex items-center space-x-3">
              <div className="relative">
                <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                <div className="absolute inset-0 w-3 h-3 bg-gradient-to-r from-green-400 to-cyan-400 rounded-full blur-sm animate-ping"></div>
              </div>
              <span className="text-sm text-gray-400 font-medium tracking-wide">
                AI Ready
              </span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Header
