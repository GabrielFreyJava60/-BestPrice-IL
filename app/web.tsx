'use client';

import React, { useState } from 'react';
import { Search, ShoppingCart, TrendingDown, Store, X, Plus, Trash2 } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  store: string;
  image?: string;
  unit?: string;
}

interface CartItem extends Product {
  quantity: number;
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'חלב 3% טרה 1 ליטר', price: 6.90, store: 'Shufersal', unit: '1L' },
  { id: '2', name: 'חלב 3% טרה 1 ליטר', price: 6.50, store: 'Rami Levy', unit: '1L' },
  { id: '3', name: 'חלב 3% טרה 1 ליטר', price: 6.80, store: 'Victory', unit: '1L' },
  { id: '4', name: 'לחם פרוס לבן', price: 5.90, store: 'Shufersal', unit: '750g' },
  { id: '5', name: 'לחם פרוס לבן', price: 5.50, store: 'Rami Levy', unit: '750g' },
  { id: '6', name: 'לחם פרוס לבן', price: 5.70, store: 'Victory', unit: '750g' },
  { id: '7', name: 'ביצים גדולות', price: 12.90, store: 'Shufersal', unit: '12 יח' },
  { id: '8', name: 'ביצים גדולות', price: 11.90, store: 'Rami Levy', unit: '12 יח' },
  { id: '9', name: 'ביצים גדולות', price: 12.50, store: 'Victory', unit: '12 יח' },
];

export default function PriceCompareWebApp() {
  const [activeTab, setActiveTab] = useState<'search' | 'compare' | 'cart'>('search');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [compareList, setCompareList] = useState<Product[]>([]);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
    
    setIsSearching(true);
    
    setTimeout(() => {
      const results = MOCK_PRODUCTS.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results);
      setIsSearching(false);
    }, 500);
  };

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const addToCompare = (product: Product) => {
    if (!compareList.find(p => p.id === product.id)) {
      setCompareList(prev => [...prev, product]);
    }
  };

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const getCheapestPrice = (productName: string) => {
    const prices = compareList
      .filter(p => p.name === productName)
      .map(p => p.price);
    return prices.length > 0 ? Math.min(...prices) : 0;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50" dir="rtl" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-8 h-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-800">BestPrice IL</h1>
            </div>
            <div className="relative">
              <ShoppingCart className="w-6 h-6 text-gray-600" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cart.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      <nav className="bg-white border-b sticky top-16 z-40">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-1">
            {[
              { id: 'search', label: 'חיפוש', icon: Search },
              { id: 'compare', label: 'השוואה', icon: Store },
              { id: 'cart', label: 'עגלה', icon: ShoppingCart }
            ].map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-2 px-6 py-3 font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-blue-600 border-b-2 border-blue-600'
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {activeTab === 'search' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSearch()}
                  placeholder="חפש מוצר..."
                  className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none text-lg"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="px-8 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 disabled:bg-gray-400 font-medium transition-colors"
                >
                  {isSearching ? 'מחפש...' : 'חפש'}
                </button>
              </div>
            </div>

            {!searchQuery && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 text-gray-800">חיפושים מהירים</h3>
                <div className="flex flex-wrap gap-2">
                  {['חלב', 'לחם', 'ביצים', 'גבינה', 'יוגורט'].map(term => (
                    <button
                      key={term}
                      onClick={() => {
                        setSearchQuery(term);
                        setTimeout(() => handleSearch(), 100);
                      }}
                      className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {searchResults.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-800">
                  נמצאו {searchResults.length} תוצאות
                </h2>
                
                <div className="grid gap-4">
                  {searchResults.map(product => {
                    const cheapest = getCheapestPrice(product.name);
                    const isCheapest = cheapest > 0 && product.price === cheapest;
                    
                    return (
                      <div
                        key={product.id}
                        className={`bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition-shadow ${
                          isCheapest ? 'ring-2 ring-green-500' : ''
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Store className="w-5 h-5 text-gray-400" />
                              <span className="text-sm font-medium text-gray-600">
                                {product.store}
                              </span>
                              {isCheapest && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                                  הזול ביותר!
                                </span>
                              )}
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 mb-1">
                              {product.name}
                            </h3>
                            {product.unit && (
                              <p className="text-sm text-gray-500">{product.unit}</p>
                            )}
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-left">
                              <p className="text-2xl font-bold text-blue-600">
                                ₪{product.price.toFixed(2)}
                              </p>
                            </div>
                            <div className="flex flex-col gap-2">
                              <button
                                onClick={() => addToCart(product)}
                                className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                title="הוסף לעגלה"
                              >
                                <ShoppingCart className="w-5 h-5" />
                              </button>
                              <button
                                onClick={() => addToCompare(product)}
                                className="p-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                title="הוסף להשוואה"
                              >
                                <Plus className="w-5 h-5" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'compare' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">השוואת מחירים</h2>
              
              {compareList.length === 0 ? (
                <div className="text-center py-12">
                  <Store className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">אין מוצרים להשוואה</p>
                  <p className="text-gray-400 text-sm mt-2">חפש מוצרים והוסף אותם להשוואה</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {Object.entries(
                    compareList.reduce((acc, product) => {
                      if (!acc[product.name]) acc[product.name] = [];
                      acc[product.name].push(product);
                      return acc;
                    }, {} as Record<string, Product[]>)
                  ).map(([name, products]) => {
                    const cheapest = Math.min(...products.map(p => p.price));
                    
                    return (
                      <div key={name} className="border rounded-xl p-4">
                        <h3 className="font-semibold text-lg mb-3 text-gray-800">{name}</h3>
                        <div className="grid gap-3">
                          {products.map(product => (
                            <div
                              key={product.id}
                              className={`flex items-center justify-between p-3 rounded-lg ${
                                product.price === cheapest
                                  ? 'bg-green-50 border-2 border-green-500'
                                  : 'bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <Store className="w-5 h-5 text-gray-600" />
                                <span className="font-medium">{product.store}</span>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className={`text-xl font-bold ${
                                  product.price === cheapest ? 'text-green-600' : 'text-gray-700'
                                }`}>
                                  ₪{product.price.toFixed(2)}
                                </span>
                                {product.price === cheapest && (
                                  <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full">
                                    הכי זול
                                  </span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm text-gray-600">
                            חיסכון: ₪{(Math.max(...products.map(p => p.price)) - cheapest).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                  
                  <button
                    onClick={() => setCompareList([])}
                    className="w-full py-3 bg-red-100 text-red-600 rounded-xl hover:bg-red-200 transition-colors font-medium"
                  >
                    נקה השוואה
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'cart' && (
          <div className="space-y-6">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-gray-800">עגלת הקניות</h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 text-lg">העגלה ריקה</p>
                  <p className="text-gray-400 text-sm mt-2">הוסף מוצרים מהחיפוש</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map(item => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-4 bg-gray-50 rounded-xl"
                    >
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.store}</p>
                        <p className="text-sm text-blue-600 font-medium mt-1">
                          ₪{item.price.toFixed(2)} × {item.quantity}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 bg-white rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          >
                            −
                          </button>
                          <span className="w-8 text-center font-semibold">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100 rounded transition-colors"
                          >
                            +
                          </button>
                        </div>
                        
                        <div className="text-left min-w-[80px]">
                          <p className="text-lg font-bold text-gray-800">
                            ₪{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4 mt-4">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-xl font-semibold text-gray-800">סה"כ:</span>
                      <span className="text-2xl font-bold text-blue-600">
                        ₪{cartTotal.toFixed(2)}
                      </span>
                    </div>
                    
                    <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all font-semibold text-lg shadow-lg">
                      המשך לתשלום
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>

      <footer className="bg-white border-t mt-12 py-6">
        <div className="max-w-6xl mx-auto px-4 text-center text-gray-600">
          <p>© 2024 BestPrice IL - השוואת מחירים חכמה</p>
          <p className="text-sm mt-2">עובד על כל מכשיר: iOS, Android, Web</p>
        </div>
      </footer>
    </div>
  );
}

