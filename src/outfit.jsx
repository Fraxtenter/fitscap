import React, { useState, useEffect } from 'react';
import { Check, X, AlertTriangle, Shirt, Users, Calendar, Thermometer, Palette, Star, RotateCcw, Save, Download } from 'lucide-react';

const OutfitCompatibilityChecker2 = () => {
  const [selectedItems, setSelectedItems] = useState({
    shirt: null,
    pants: null,
    shoes: null,
    jacket: null,
    accessories: []
  });
  
  const [occasion, setOccasion] = useState('casual');
  const [season, setSeason] = useState('spring');
  const [compatibilityScore, setCompatibilityScore] = useState(null);
  const [recommendations, setRecommendations] = useState([]);

  // Clothing items database
  const clothingItems = {
    shirt: [
      { id: 1, name: 'White Dress Shirt', color: 'white', style: 'formal', season: ['all'], formality: 5 },
      { id: 2, name: 'Navy Polo', color: 'navy', style: 'casual', season: ['spring', 'summer', 'fall'], formality: 2 },
      { id: 3, name: 'Light Blue Oxford', color: 'light-blue', style: 'business-casual', season: ['all'], formality: 4 },
      { id: 4, name: 'Black T-Shirt', color: 'black', style: 'casual', season: ['spring', 'summer', 'fall'], formality: 1 },
      { id: 5, name: 'Gray Henley', color: 'gray', style: 'casual', season: ['fall', 'winter'], formality: 2 },
      { id: 6, name: 'Burgundy Button-Up', color: 'burgundy', style: 'business-casual', season: ['fall', 'winter'], formality: 3 },
      { id: 7, name: 'Striped Casual Shirt', color: 'white-navy', style: 'casual', season: ['spring', 'summer'], formality: 2 },
      { id: 8, name: 'Forest Green Flannel', color: 'forest-green', style: 'casual', season: ['fall', 'winter'], formality: 2 }
    ],
    pants: [
      { id: 1, name: 'Black Dress Pants', color: 'black', style: 'formal', season: ['all'], formality: 5 },
      { id: 2, name: 'Navy Chinos', color: 'navy', style: 'business-casual', season: ['all'], formality: 3 },
      { id: 3, name: 'Dark Jeans', color: 'dark-blue', style: 'casual', season: ['all'], formality: 2 },
      { id: 4, name: 'Khaki Chinos', color: 'khaki', style: 'casual', season: ['spring', 'summer', 'fall'], formality: 2 },
      { id: 5, name: 'Gray Dress Pants', color: 'gray', style: 'formal', season: ['all'], formality: 4 },
      { id: 6, name: 'Light Jeans', color: 'light-blue', style: 'casual', season: ['spring', 'summer'], formality: 1 },
      { id: 7, name: 'Olive Cargo Pants', color: 'olive', style: 'casual', season: ['fall', 'winter'], formality: 1 },
      { id: 8, name: 'Charcoal Wool Trousers', color: 'charcoal', style: 'formal', season: ['fall', 'winter'], formality: 5 }
    ],
    shoes: [
      { id: 1, name: 'Black Oxford Shoes', color: 'black', style: 'formal', season: ['all'], formality: 5 },
      { id: 2, name: 'Brown Leather Loafers', color: 'brown', style: 'business-casual', season: ['all'], formality: 3 },
      { id: 3, name: 'White Sneakers', color: 'white', style: 'casual', season: ['all'], formality: 1 },
      { id: 4, name: 'Brown Boots', color: 'brown', style: 'casual', season: ['fall', 'winter'], formality: 2 },
      { id: 5, name: 'Navy Canvas Shoes', color: 'navy', style: 'casual', season: ['spring', 'summer'], formality: 1 },
      { id: 6, name: 'Black Dress Boots', color: 'black', style: 'formal', season: ['fall', 'winter'], formality: 4 },
      { id: 7, name: 'Tan Desert Boots', color: 'tan', style: 'business-casual', season: ['spring', 'fall'], formality: 3 },
      { id: 8, name: 'Gray Athletic Shoes', color: 'gray', style: 'athletic', season: ['all'], formality: 1 }
    ],
    jacket: [
      { id: 1, name: 'Navy Blazer', color: 'navy', style: 'formal', season: ['fall', 'winter', 'spring'], formality: 4 },
      { id: 2, name: 'Black Suit Jacket', color: 'black', style: 'formal', season: ['all'], formality: 5 },
      { id: 3, name: 'Denim Jacket', color: 'blue', style: 'casual', season: ['spring', 'fall'], formality: 1 },
      { id: 4, name: 'Gray Cardigan', color: 'gray', style: 'business-casual', season: ['fall', 'winter'], formality: 2 },
      { id: 5, name: 'Brown Leather Jacket', color: 'brown', style: 'casual', season: ['fall', 'winter'], formality: 2 },
      { id: 6, name: 'Charcoal Wool Coat', color: 'charcoal', style: 'formal', season: ['winter'], formality: 4 }
    ],
    accessories: [
      { id: 1, name: 'Black Leather Belt', color: 'black', style: 'formal', season: ['all'], formality: 4 },
      { id: 2, name: 'Brown Leather Belt', color: 'brown', style: 'casual', season: ['all'], formality: 2 },
      { id: 3, name: 'Silver Watch', color: 'silver', style: 'business-casual', season: ['all'], formality: 3 },
      { id: 4, name: 'Gold Watch', color: 'gold', style: 'formal', season: ['all'], formality: 4 },
      { id: 5, name: 'Navy Tie', color: 'navy', style: 'formal', season: ['all'], formality: 5 },
      { id: 6, name: 'Burgundy Tie', color: 'burgundy', style: 'formal', season: ['all'], formality: 5 },
      { id: 7, name: 'Pocket Square', color: 'white', style: 'formal', season: ['all'], formality: 4 },
      { id: 8, name: 'Sunglasses', color: 'black', style: 'casual', season: ['spring', 'summer'], formality: 1 }
    ]
  };

  // Color compatibility matrix
  const colorCompatibility = {
    white: ['black', 'navy', 'gray', 'burgundy', 'forest-green', 'brown', 'khaki', 'charcoal'],
    black: ['white', 'gray', 'silver', 'light-blue', 'burgundy'],
    navy: ['white', 'light-blue', 'gray', 'brown', 'khaki', 'burgundy', 'tan'],
    gray: ['white', 'black', 'navy', 'burgundy', 'dark-blue', 'silver'],
    brown: ['white', 'navy', 'khaki', 'tan', 'forest-green', 'burgundy'],
    'light-blue': ['white', 'navy', 'gray', 'brown', 'khaki', 'charcoal'],
    burgundy: ['white', 'navy', 'gray', 'black', 'charcoal'],
    khaki: ['white', 'navy', 'brown', 'forest-green', 'burgundy'],
    'dark-blue': ['white', 'gray', 'brown', 'khaki'],
    'forest-green': ['white', 'brown', 'khaki', 'tan'],
    charcoal: ['white', 'light-blue', 'burgundy', 'silver'],
    tan: ['navy', 'brown', 'forest-green', 'white'],
    olive: ['white', 'black', 'brown', 'tan'],
    gold: ['white', 'navy', 'black', 'burgundy'],
    silver: ['black', 'gray', 'white', 'charcoal']
  };

  // Occasion requirements
  const occasionRequirements = {
    casual: { minFormality: 1, maxFormality: 3 },
    'business-casual': { minFormality: 2, maxFormality: 4 },
    formal: { minFormality: 4, maxFormality: 5 },
    athletic: { minFormality: 1, maxFormality: 2 },
    date: { minFormality: 2, maxFormality: 4 },
    wedding: { minFormality: 4, maxFormality: 5 }
  };

  // Calculate outfit compatibility
  const calculateCompatibility = () => {
    if (!selectedItems.shirt || !selectedItems.pants || !selectedItems.shoes) {
      return null;
    }

    let score = 0;
    let maxScore = 0;
    const issues = [];
    const suggestions = [];

    // Color compatibility check
    const items = [selectedItems.shirt, selectedItems.pants, selectedItems.shoes, selectedItems.jacket].filter(Boolean);
    items.forEach(item => selectedItems.accessories.forEach(acc => items.push(acc)));

    maxScore += 30; // Color compatibility max score
    let colorScore = 30;
    
    for (let i = 0; i < items.length; i++) {
      for (let j = i + 1; j < items.length; j++) {
        const item1 = items[i];
        const item2 = items[j];
        const compatible = colorCompatibility[item1.color]?.includes(item2.color) || 
                          colorCompatibility[item2.color]?.includes(item1.color);
        
        if (!compatible) {
          colorScore -= 5;
          issues.push(`${item1.name} and ${item2.name} colors don't complement each other well`);
        }
      }
    }
    score += Math.max(0, colorScore);

    // Style consistency check
    maxScore += 25;
    const styles = items.map(item => item.style);
    const uniqueStyles = [...new Set(styles)];
    
    if (uniqueStyles.length === 1) {
      score += 25;
    } else if (uniqueStyles.length === 2 && 
               ((uniqueStyles.includes('formal') && uniqueStyles.includes('business-casual')) ||
                (uniqueStyles.includes('business-casual') && uniqueStyles.includes('casual')))) {
      score += 20;
    } else if (uniqueStyles.length === 2) {
      score += 10;
      issues.push('Mixed style elements - consider more consistent styling');
    } else {
      score += 5;
      issues.push('Too many different styles mixed together');
    }

    // Formality level check
    maxScore += 25;
    const avgFormality = items.reduce((sum, item) => sum + item.formality, 0) / items.length;
    const requirement = occasionRequirements[occasion];
    
    if (avgFormality >= requirement.minFormality && avgFormality <= requirement.maxFormality) {
      score += 25;
    } else if (avgFormality < requirement.minFormality) {
      score += 10;
      issues.push(`Outfit may be too casual for ${occasion} occasion`);
      suggestions.push('Consider adding more formal pieces');
    } else {
      score += 10;
      issues.push(`Outfit may be too formal for ${occasion} occasion`);
      suggestions.push('Consider more relaxed pieces');
    }

    // Season appropriateness
    maxScore += 20;
    const seasonAppropriate = items.every(item => 
      item.season.includes('all') || item.season.includes(season)
    );
    
    if (seasonAppropriate) {
      score += 20;
    } else {
      score += 5;
      issues.push(`Some items may not be suitable for ${season}`);
    }

    const finalScore = Math.round((score / maxScore) * 100);
    
    // Add general suggestions
    if (finalScore >= 90) {
      suggestions.push('Excellent outfit combination!');
    } else if (finalScore >= 75) {
      suggestions.push('Great outfit with minor improvements possible');
    } else if (finalScore >= 60) {
      suggestions.push('Good base outfit, consider some adjustments');
    } else {
      suggestions.push('This combination needs significant improvements');
    }

    return {
      score: finalScore,
      issues,
      suggestions,
      grade: finalScore >= 90 ? 'A+' : finalScore >= 80 ? 'A' : finalScore >= 70 ? 'B' : finalScore >= 60 ? 'C' : 'D'
    };
  };

  useEffect(() => {
    const result = calculateCompatibility();
    setCompatibilityScore(result);
    if (result) {
      setRecommendations([...result.issues, ...result.suggestions]);
    }
  }, [selectedItems, occasion, season]);

  const handleItemSelect = (category, item) => {
    if (category === 'accessories') {
      const isSelected = selectedItems.accessories.some(acc => acc.id === item.id);
      if (isSelected) {
        setSelectedItems(prev => ({
          ...prev,
          accessories: prev.accessories.filter(acc => acc.id !== item.id)
        }));
      } else {
        setSelectedItems(prev => ({
          ...prev,
          accessories: [...prev.accessories, item]
        }));
      }
    } else {
      setSelectedItems(prev => ({
        ...prev,
        [category]: prev[category]?.id === item.id ? null : item
      }));
    }
  };

  const resetOutfit = () => {
    setSelectedItems({
      shirt: null,
      pants: null,
      shoes: null,
      jacket: null,
      accessories: []
    });
    setCompatibilityScore(null);
    setRecommendations([]);
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 75) return 'text-blue-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBg = (score) => {
    if (score >= 90) return 'from-green-500 to-green-600';
    if (score >= 75) return 'from-blue-500 to-blue-600';
    if (score >= 60) return 'from-yellow-500 to-yellow-600';
    return 'from-red-500 to-red-600';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-purple-200 to-blue-100 py-8 animate-fadein">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-pink-500 to-blue-500 mb-4 drop-shadow-2xl animate-bounce-slow">
            Outfit Compatibility Checker
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto animate-fadein bg-gradient-to-r from-purple-200 via-pink-100 to-blue-100 bg-clip-text text-transparent">
            Create the perfect women's outfit with our AI-powered style analyzer. 
            Select clothing items and get instant compatibility feedback.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Panel - Settings */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center">
                <Calendar className="w-6 h-6 mr-3 text-blue-600" />
                Occasion & Season
              </h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Occasion
                  </label>
                  <select 
                    value={occasion} 
                    onChange={(e) => setOccasion(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="casual">Casual</option>
                    <option value="business-casual">Business Casual</option>
                    <option value="formal">Formal</option>
                    <option value="athletic">Athletic</option>
                    <option value="date">Date Night</option>
                    <option value="wedding">Wedding</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Season
                  </label>
                  <select 
                    value={season} 
                    onChange={(e) => setSeason(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="spring">Spring</option>
                    <option value="summer">Summer</option>
                    <option value="fall">Fall</option>
                    <option value="winter">Winter</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Compatibility Score */}
            {compatibilityScore && (
              <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Star className="w-6 h-6 mr-3 text-yellow-500" />
                  Compatibility Score
                </h2>
                
                <div className="text-center">
                  <div className={`w-32 h-32 mx-auto rounded-full bg-gradient-to-br ${getScoreBg(compatibilityScore.score)} flex items-center justify-center mb-4 shadow-lg`}>
                    <div className="text-center">
                      <div className="text-3xl font-black text-white">{compatibilityScore.score}</div>
                      <div className="text-sm text-white/80">/ 100</div>
                    </div>
                  </div>
                  <div className={`text-2xl font-bold mb-2 ${getScoreColor(compatibilityScore.score)}`}>
                    Grade: {compatibilityScore.grade}
                  </div>
                  <p className="text-gray-600">
                    {compatibilityScore.score >= 90 ? 'Outstanding!' : 
                     compatibilityScore.score >= 75 ? 'Great outfit!' : 
                     compatibilityScore.score >= 60 ? 'Good combination' : 
                     'Needs improvement'}
                  </p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="bg-white rounded-3xl shadow-xl p-8">
              <div className="space-y-4">
                <button 
                  onClick={resetOutfit}
                  className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-xl transition-colors duration-200"
                >
                  <RotateCcw className="w-5 h-5" />
                  <span>Reset Outfit</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl transition-colors duration-200">
                  <Save className="w-5 h-5" />
                  <span>Save Outfit</span>
                </button>
                <button className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl transition-colors duration-200">
                  <Download className="w-5 h-5" />
                  <span>Export Report</span>
                </button>
              </div>
            </div>
          </div>

          {/* Middle Panel - Clothing Selection */}
          <div className="xl:col-span-1">
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-6 flex items-center"> 
                <Shirt className="w-6 h-6 mr-3 text-purple-700" />
                Select Your Outfit
              </h2>
              <div className="max-h-[420px] overflow-y-auto pr-2 custom-scroll">
                {Object.entries(clothingItems).map(([category, items]) => (
                  <div key={category} className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 capitalize">
                      {category === 'accessories' ? 'Accessories (optional)' : category}
                    </h3>
                    <div className="grid grid-cols-1 gap-3">
                      {items.map(item => {
                        const isSelected = category === 'accessories' ? 
                          selectedItems.accessories.some(acc => acc.id === item.id) :
                          selectedItems[category]?.id === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => handleItemSelect(category, item)}
                            className={`p-4 rounded-xl border-2 transition-all duration-200 text-left ${
                              isSelected 
                                ? 'border-blue-500 bg-blue-50 shadow-md' 
                                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-semibold text-gray-900">{item.name}</div>
                                <div className="text-sm text-gray-600 capitalize">
                                  {item.color} • {item.style} • Formality: {item.formality}/5
                                </div>
                              </div>
                              {isSelected && (
                                <Check className="w-5 h-5 text-blue-600 flex-shrink-0" />
                              )}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Panel - Current Outfit & Recommendations */}
          <div className="xl:col-span-1">
            {/* Current Outfit */}
            <div className="bg-white rounded-3xl shadow-xl p-8 mb-8">
              <h2 className="text-2xl font-bold text-purple-700 mb-6">Current Outfit</h2>
              
              <div className="space-y-4">
                {Object.entries(selectedItems).map(([category, item]) => (
                  <div key={category} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                    <div className="capitalize font-medium text-gray-700">
                      {category}:
                    </div>
                    <div className="text-right">
                      {category === 'accessories' ? (
                        item.length > 0 ? (
                          <div className="text-sm text-gray-600">
                            {item.map(acc => acc.name).join(', ')}
                          </div>
                        ) : (
                          <div className="text-sm text-gray-400">None selected</div>
                        )
                      ) : item ? (
                        <div className="text-sm text-gray-600">{item.name}</div>
                      ) : (
                        <div className="text-sm text-gray-400">Not selected</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            {recommendations.length > 0 && (
              <div className="bg-white rounded-3xl shadow-xl p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <AlertTriangle className="w-6 h-6 mr-3 text-yellow-500" />
                  Style Analysis
                </h2>
                
                <div className="space-y-4">
                  {recommendations.map((rec, index) => (
                    <div 
                      key={index} 
                      className={`p-4 rounded-xl border-l-4 ${
                        rec.includes('Excellent') || rec.includes('Great') ? 
                          'border-green-500 bg-green-50' :
                        rec.includes('Good') ? 
                          'border-blue-500 bg-blue-50' :
                          'border-yellow-500 bg-yellow-50'
                      }`}
                    >
                      <p className="text-sm text-gray-700">{rec}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OutfitCompatibilityChecker2;