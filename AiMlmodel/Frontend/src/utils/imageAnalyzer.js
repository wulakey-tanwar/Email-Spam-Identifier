// Image-based spam detection logic
export const analyzeImages = async (images) => {
  if (!images || images.length === 0) return null
  
  const results = []
  
  for (const image of images) {
    try {
      const analysis = await analyzeSingleImage(image)
      results.push({
        imageId: image.id,
        fileName: image.name,
        analysis
      })
    } catch (error) {
      console.error(`Error analyzing image ${image.name}:`, error)
      results.push({
        imageId: image.id,
        fileName: image.name,
        analysis: {
          isSpam: false,
          confidence: 0,
          detectedPatterns: [],
          error: 'Failed to analyze image'
        }
      })
    }
  }
  
  return results
}

const analyzeSingleImage = async (image) => {
  // Simulate image analysis delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  // Create a canvas to analyze the image
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  const img = new Image()
  
  return new Promise((resolve) => {
    img.onload = () => {
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)
      
      // Analyze image data
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const analysis = performImageAnalysis(imageData, img.width, img.height)
      
      resolve(analysis)
    }
    
    img.src = image.preview
  })
}

const performImageAnalysis = (imageData, width, height) => {
  const { data } = imageData
  let totalScore = 0
  let maxPossibleScore = 0
  const detectedPatterns = []
  
  // Analyze pixel data for suspicious patterns
  const analysis = {
    // Check for excessive use of bright/attention-grabbing colors
    brightColors: analyzeBrightColors(data),
    
    // Check for text-like patterns (simplified OCR simulation)
    textPatterns: analyzeTextPatterns(data, width, height),
    
    // Check for suspicious color combinations
    colorCombinations: analyzeColorCombinations(data),
    
    // Check for high contrast patterns
    contrastPatterns: analyzeContrastPatterns(data, width, height),
    
    // Check for repetitive patterns
    repetitivePatterns: analyzeRepetitivePatterns(data, width, height)
  }
  
  // Calculate scores for each pattern type
  if (analysis.brightColors.score > 0) {
    totalScore += analysis.brightColors.score
    maxPossibleScore += 20
    detectedPatterns.push({
      type: 'bright_colors',
      description: 'Excessive use of bright/attention-grabbing colors',
      score: analysis.brightColors.score,
      details: analysis.brightColors.details
    })
  }
  
  if (analysis.textPatterns.score > 0) {
    totalScore += analysis.textPatterns.score
    maxPossibleScore += 30
    detectedPatterns.push({
      type: 'text_patterns',
      description: 'Suspicious text patterns detected',
      score: analysis.textPatterns.score,
      details: analysis.textPatterns.details
    })
  }
  
  if (analysis.colorCombinations.score > 0) {
    totalScore += analysis.colorCombinations.score
    maxPossibleScore += 25
    detectedPatterns.push({
      type: 'color_combinations',
      description: 'Suspicious color combinations',
      score: analysis.colorCombinations.score,
      details: analysis.colorCombinations.details
    })
  }
  
  if (analysis.contrastPatterns.score > 0) {
    totalScore += analysis.contrastPatterns.score
    maxPossibleScore += 15
    detectedPatterns.push({
      type: 'contrast_patterns',
      description: 'High contrast patterns detected',
      score: analysis.contrastPatterns.score,
      details: analysis.contrastPatterns.details
    })
  }
  
  if (analysis.repetitivePatterns.score > 0) {
    totalScore += analysis.repetitivePatterns.score
    maxPossibleScore += 10
    detectedPatterns.push({
      type: 'repetitive_patterns',
      description: 'Repetitive visual patterns',
      score: analysis.repetitivePatterns.score,
      details: analysis.repetitivePatterns.details
    })
  }
  
  // Calculate final spam probability
  const spamProbability = maxPossibleScore > 0 ? (totalScore / maxPossibleScore) * 100 : 0
  const isSpam = spamProbability > 40 // Lower threshold for images
  
  // Add some randomness for demo purposes
  const randomFactor = Math.random() * 0.2 - 0.1
  const finalConfidence = Math.max(0, Math.min(100, spamProbability + randomFactor * 100))
  
  return {
    isSpam,
    confidence: finalConfidence,
    totalScore,
    maxPossibleScore,
    detectedPatterns,
    spamProbability,
    analysis
  }
}

const analyzeBrightColors = (data) => {
  let brightPixelCount = 0
  let totalPixels = data.length / 4
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    // Check for bright/attention-grabbing colors
    if ((r > 200 && g > 200) || (r > 200 && b > 200) || (g > 200 && b > 200)) {
      brightPixelCount++
    }
  }
  
  const brightPercentage = (brightPixelCount / totalPixels) * 100
  const score = brightPercentage > 30 ? Math.min(brightPercentage * 0.5, 20) : 0
  
  return {
    score,
    details: {
      brightPixelPercentage: brightPercentage.toFixed(1),
      threshold: 30
    }
  }
}

const analyzeTextPatterns = (data, width, height) => {
  // Simplified text pattern detection
  // In a real implementation, this would use OCR libraries like Tesseract.js
  
  let textLikePatterns = 0
  let totalPixels = data.length / 4
  
  // Look for horizontal and vertical lines (potential text)
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      
      // Check for dark pixels (potential text)
      if (r < 100 && g < 100 && b < 100) {
        // Check surrounding pixels for line patterns
        if (isPartOfLine(data, x, y, width, height)) {
          textLikePatterns++
        }
      }
    }
  }
  
  const textPercentage = (textLikePatterns / totalPixels) * 100
  const score = textPercentage > 10 ? Math.min(textPercentage * 2, 30) : 0
  
  return {
    score,
    details: {
      textPatternPercentage: textPercentage.toFixed(1),
      threshold: 10
    }
  }
}

const isPartOfLine = (data, x, y, width, height) => {
  // Simple line detection - check if pixel is part of a horizontal or vertical line
  let horizontalLine = 0
  let verticalLine = 0
  
  // Check horizontal line
  for (let dx = -2; dx <= 2; dx++) {
    if (x + dx >= 0 && x + dx < width) {
      const idx = (y * width + (x + dx)) * 4
      if (data[idx] < 100 && data[idx + 1] < 100 && data[idx + 2] < 100) {
        horizontalLine++
      }
    }
  }
  
  // Check vertical line
  for (let dy = -2; dy <= 2; dy++) {
    if (y + dy >= 0 && y + dy < height) {
      const idx = ((y + dy) * width + x) * 4
      if (data[idx] < 100 && data[idx + 1] < 100 && data[idx + 2] < 100) {
        verticalLine++
      }
    }
  }
  
  return horizontalLine >= 3 || verticalLine >= 3
}

const analyzeColorCombinations = (data) => {
  let suspiciousCombinations = 0
  let totalPixels = data.length / 4
  
  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]
    
    // Check for suspicious color combinations (e.g., pure red, pure green, etc.)
    if ((r > 200 && g < 50 && b < 50) || // Pure red
        (r < 50 && g > 200 && b < 50) || // Pure green
        (r < 50 && g < 50 && b > 200) || // Pure blue
        (r > 200 && g > 200 && b < 50)) { // Yellow
      suspiciousCombinations++
    }
  }
  
  const suspiciousPercentage = (suspiciousCombinations / totalPixels) * 100
  const score = suspiciousPercentage > 20 ? Math.min(suspiciousPercentage * 0.8, 25) : 0
  
  return {
    score,
    details: {
      suspiciousColorPercentage: suspiciousPercentage.toFixed(1),
      threshold: 20
    }
  }
}

const analyzeContrastPatterns = (data, width, height) => {
  let highContrastPixels = 0
  let totalPixels = data.length / 4
  
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * 4
      const currentR = data[idx]
      const currentG = data[idx + 1]
      const currentB = data[idx + 2]
      
      // Check contrast with neighboring pixels
      const neighbors = [
        data[((y - 1) * width + x) * 4], // top
        data[((y + 1) * width + x) * 4], // bottom
        data[(y * width + (x - 1)) * 4], // left
        data[(y * width + (x + 1)) * 4]  // right
      ]
      
      const avgNeighbor = neighbors.reduce((sum, val) => sum + val, 0) / neighbors.length
      const contrast = Math.abs(currentR - avgNeighbor)
      
      if (contrast > 100) { // High contrast threshold
        highContrastPixels++
      }
    }
  }
  
  const contrastPercentage = (highContrastPixels / totalPixels) * 100
  const score = contrastPercentage > 15 ? Math.min(contrastPercentage * 0.8, 15) : 0
  
  return {
    score,
    details: {
      highContrastPercentage: contrastPercentage.toFixed(1),
      threshold: 15
    }
  }
}

const analyzeRepetitivePatterns = (data, width, height) => {
  // Simplified repetitive pattern detection
  let repetitivePixels = 0
  let totalPixels = data.length / 4
  
  // Check for repetitive patterns in small regions
  const regionSize = Math.min(20, Math.min(width, height) / 4)
  
  for (let y = 0; y < height - regionSize; y += regionSize) {
    for (let x = 0; x < width - regionSize; x += regionSize) {
      if (hasRepetitivePattern(data, x, y, regionSize, width)) {
        repetitivePixels += regionSize * regionSize
      }
    }
  }
  
  const repetitivePercentage = (repetitivePixels / totalPixels) * 100
  const score = repetitivePercentage > 25 ? Math.min(repetitivePercentage * 0.3, 10) : 0
  
  return {
    score,
    details: {
      repetitivePatternPercentage: repetitivePercentage.toFixed(1),
      threshold: 25
    }
  }
}

const hasRepetitivePattern = (data, startX, startY, size, width) => {
  // Check if a region has repetitive patterns
  let patternCount = 0
  
  for (let y = startY; y < startY + size; y++) {
    for (let x = startX; x < startX + size; x++) {
      const idx = (y * width + x) * 4
      const r = data[idx]
      const g = data[idx + 1]
      const b = data[idx + 2]
      
      // Count pixels with similar colors (potential repetitive pattern)
      if (r > 200 || g > 200 || b > 200) {
        patternCount++
      }
    }
  }
  
  const patternPercentage = (patternCount / (size * size)) * 100
  return patternPercentage > 60
}
