import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import Cart from './Cart';
import ProductDetail from './ProductDetail';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  isNew?: boolean;
  isSale?: boolean;
}

interface Review {
  id: number;
  productId: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Элегантное белое платье",
    price: 12990,
    originalPrice: 15990,
    image: "/img/9aa4de47-3518-4c29-93ca-85b2af66b7d2.jpg",
    category: "Одежда",
    rating: 4.8,
    reviews: 24,
    isSale: true
  },
  {
    id: 2,
    name: "Кожаная сумка",
    price: 8490,
    image: "/img/f9ac6380-3bac-4849-aa8a-844dea79d5f6.jpg",
    category: "Аксессуары",
    rating: 4.9,
    reviews: 18,
    isNew: true
  },
  {
    id: 3,
    name: "Кашемировый шарф",
    price: 5990,
    image: "/img/8ec65299-bcd9-478a-b9ff-2ed6ce8f959f.jpg",
    category: "Текстиль",
    rating: 4.7,
    reviews: 31
  },
  {
    id: 4,
    name: "Шелковая блузка",
    price: 9990,
    image: "/img/87c0a3ac-2d39-42a4-b90b-1b5364b49d85.jpg",
    category: "Одежда",
    rating: 4.6,
    reviews: 15,
    isNew: true
  },
  {
    id: 5,
    name: "Золотые серьги",
    price: 6490,
    image: "/img/0d50317a-cd94-4227-9cec-42328dac24a0.jpg",
    category: "Аксессуары",
    rating: 4.9,
    reviews: 27
  }
];

const reviews: Review[] = [
  {
    id: 1,
    productId: 1,
    name: "Анна К.",
    rating: 5,
    comment: "Прекрасное качество ткани! Платье сидит идеально.",
    date: "15 сентября 2024"
  },
  {
    id: 2,
    productId: 2,
    name: "Мария С.",
    rating: 5,
    comment: "Сумка превзошла все ожидания. Очень довольна покупкой!",
    date: "12 сентября 2024"
  },
  {
    id: 3,
    productId: 3,
    name: "Елена В.",
    rating: 4,
    comment: "Мягкий и теплый шарф, отличное качество кашемира.",
    date: "10 сентября 2024"
  }
];

function Index() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [showCart, setShowCart] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<number | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [priceRange, setPriceRange] = useState([0, 20000]);
  const [showNewOnly, setShowNewOnly] = useState(false);
  const [showSaleOnly, setShowSaleOnly] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const categories = ['Все', 'Одежда', 'Аксессуары', 'Текстиль'];

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, quantity) => sum + quantity, 0);
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="Star" size={16} className="text-yellow-400 fill-current" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="StarHalf" size={16} className="text-yellow-400 fill-current" />
      );
    }

    const emptyStars = 5 - Math.ceil(rating);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(
        <Icon key={`empty-${i}`} name="Star" size={16} className="text-gray-300" />
      );
    }

    return stars;
  };

  const getRandomRecommendations = (currentProductId: number, count: number = 3) => {
    const otherProducts = products.filter(p => p.id !== currentProductId);
    const shuffled = [...otherProducts].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
    const matchesNew = !showNewOnly || product.isNew;
    const matchesSale = !showSaleOnly || product.isSale;
    const matchesCategory = selectedCategory === 'Все' || product.category === selectedCategory;

    return matchesSearch && matchesPrice && matchesNew && matchesSale && matchesCategory;
  });

  const getActiveFiltersCount = () => {
    let count = 0;
    if (priceRange[0] > 0 || priceRange[1] < 20000) count++;
    if (showNewOnly) count++;
    if (showSaleOnly) count++;
    if (selectedCategory !== 'Все') count++;
    return count;
  };

  if (showCart) {
    return (
      <Cart 
        cart={cart} 
        onUpdateCart={setCart} 
        onGoBack={() => setShowCart(false)} 
      />
    );
  }

  if (selectedProductId) {
    return (
      <ProductDetail 
        productId={selectedProductId} 
        onGoBack={() => setSelectedProductId(null)} 
        onAddToCart={addToCart}
        cart={cart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <img 
                src="https://cdn.poehali.dev/files/c8363e29-e092-44b9-b560-677422d9004f.jpg" 
                alt="FC Fashion Store" 
                className="h-12 w-12 object-contain"
              />
              <h1 className="ml-3 text-2xl font-bold font-montserrat text-foreground">FC Fashion Store</h1>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
              <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Одежда</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Аксессуары</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Текстиль</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Контакты</a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">Доставка</a>
            </nav>

            {/* Cart & Mobile Menu Button */}
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                className="relative"
                onClick={() => setShowCart(true)}
              >
                <Icon name="ShoppingCart" size={20} />
                {getTotalItems() > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {getTotalItems()}
                  </Badge>
                )}
              </Button>
              
              {/* Mobile Menu Button */}
              <Button 
                variant="outline" 
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="md:hidden py-4 border-t">
              <nav className="flex flex-col space-y-4">
                <a href="#" className="text-foreground hover:text-primary transition-colors">Главная</a>
                <a href="#catalog" className="text-foreground hover:text-primary transition-colors">Каталог</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Одежда</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Аксессуары</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Текстиль</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Контакты</a>
                <a href="#" className="text-foreground hover:text-primary transition-colors">Доставка</a>
              </nav>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary/10 to-secondary/10 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-bold font-montserrat text-foreground mb-6">
            Добро пожаловать в FC Fashion Store
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Откройте для себя эксклюзивную коллекцию модной одежды, аксессуаров и текстиля. 
            Качество, стиль и комфорт в каждом изделии.
          </p>
          <Button 
            size="lg" 
            className="text-lg px-8 py-6"
            onClick={() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' })}
          >
            Посмотреть каталог
            <Icon name="ArrowDown" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Search and Filters */}
      <section id="catalog" className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-8">Наш каталог</h2>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mb-6">
            <div className="relative">
              <Icon name="Search" size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Поиск товаров..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 text-base"
              />
            </div>
          </div>

          {/* Filter Toggle Button */}
          <div className="flex justify-center mb-6">
            <Button
              variant="outline"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="relative"
            >
              <Icon name="Filter" size={16} className="mr-2" />
              Фильтры
              {getActiveFiltersCount() > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                  {getActiveFiltersCount()}
                </Badge>
              )}
            </Button>
          </div>

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <Card className="max-w-4xl mx-auto mb-8">
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {/* Price Range */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">
                      Цена: {priceRange[0].toLocaleString()} - {priceRange[1].toLocaleString()} ₽
                    </label>
                    <Slider
                      value={priceRange}
                      onValueChange={setPriceRange}
                      max={20000}
                      min={0}
                      step={100}
                      className="mt-2"
                    />
                  </div>

                  {/* New Items Filter */}
                  <div>
                    <label className="text-sm font-medium mb-3 block">Особенности</label>
                    <div className="space-y-3">
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="new-items"
                          checked={showNewOnly}
                          onCheckedChange={setShowNewOnly}
                        />
                        <label htmlFor="new-items" className="text-sm cursor-pointer">
                          Только новинки
                        </label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Checkbox
                          id="sale-items"
                          checked={showSaleOnly}
                          onCheckedChange={setShowSaleOnly}
                        />
                        <label htmlFor="sale-items" className="text-sm cursor-pointer">
                          Только скидки
                        </label>
                      </div>
                    </div>
                  </div>

                  {/* Reset Filters */}
                  <div className="flex items-end">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchQuery('');
                        setPriceRange([0, 20000]);
                        setShowNewOnly(false);
                        setShowSaleOnly(false);
                        setSelectedCategory('Все');
                      }}
                      className="w-full"
                    >
                      <Icon name="RotateCcw" size={16} className="mr-2" />
                      Очистить фильтры
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="mb-2"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Search Results Info */}
          {(searchQuery || getActiveFiltersCount() > 0) && (
            <div className="text-center mb-6">
              <p className="text-muted-foreground">
                {searchQuery && `Поиск "${searchQuery}": `}
                Найдено {filteredProducts.length} товаров
                {getActiveFiltersCount() > 0 && ` (применено фильтров: ${getActiveFiltersCount()})`}
              </p>
            </div>
          )}

          {/* Products Grid */}
          {filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">Товары не найдены</h3>
              <p className="text-muted-foreground mb-4">
                По вашему запросу ничего не найдено. Попробуйте изменить параметры поиска.
              </p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery('');
                  setPriceRange([0, 20000]);
                  setShowNewOnly(false);
                  setShowSaleOnly(false);
                  setSelectedCategory('Все');
                }}
              >
                Очистить фильтры
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in">
                <div 
                  className="relative overflow-hidden rounded-t-lg cursor-pointer"
                  onClick={() => setSelectedProductId(product.id)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {product.isNew && (
                    <Badge className="absolute top-3 left-3 bg-green-600">Новинка</Badge>
                  )}
                  {product.isSale && (
                    <Badge className="absolute top-3 right-3 bg-red-600">Скидка</Badge>
                  )}
                </div>
                
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-2">
                    {renderStars(product.rating)}
                    <span className="text-sm text-muted-foreground ml-2">
                      {product.rating} ({product.reviews} отзывов)
                    </span>
                  </div>
                  
                  <h3 
                    className="text-lg font-semibold font-montserrat mb-2 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => setSelectedProductId(product.id)}
                  >
                    {product.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">{product.category}</p>
                  
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-primary">
                      {product.price.toLocaleString()} ₽
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-muted-foreground line-through">
                        {product.originalPrice.toLocaleString()} ₽
                      </span>
                    )}
                  </div>
                </CardContent>
                
                <CardFooter className="p-6 pt-0">
                  <Button 
                    className="w-full" 
                    onClick={() => addToCart(product.id)}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                  
                  {/* Recommendations */}
                  {getRandomRecommendations(product.id).length > 0 && (
                    <div className="mt-4 w-full">
                      <p className="text-xs text-muted-foreground mb-2">Рекомендуем также:</p>
                      <div className="grid grid-cols-3 gap-2">
                        {getRandomRecommendations(product.id).map(rec => (
                          <div 
                            key={rec.id}
                            className="cursor-pointer hover:opacity-80 transition-opacity"
                            onClick={() => setSelectedProductId(rec.id)}
                          >
                            <img
                              src={rec.image}
                              alt={rec.name}
                              className="w-full h-16 object-cover rounded"
                            />
                            <h5 className="text-xs font-medium text-foreground truncate mb-1 hover:text-primary transition-colors">
                              {rec.name}
                            </h5>
                            <div className="flex items-center justify-between">
                              <span className="text-xs font-bold text-primary">
                                {rec.price.toLocaleString()} ₽
                              </span>
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size={10} className="text-yellow-400 fill-current" />
                                <span className="text-xs text-muted-foreground">{rec.rating}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardFooter>
              </Card>
            ))}
            </div>
          )}
        </div>
      </section>

      {/* Reviews Section */}
      <section className="bg-secondary py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold font-montserrat text-center mb-12">Отзывы покупателей</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map(review => (
              <Card key={review.id} className="animate-scale-in">
                <CardContent className="p-6">
                  <div className="flex items-center gap-1 mb-4">
                    {renderStars(review.rating)}
                  </div>
                  
                  <p className="text-foreground mb-4 italic">"{review.comment}"</p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span className="font-medium">{review.name}</span>
                    <span>{review.date}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <img 
                  src="https://cdn.poehali.dev/files/c8363e29-e092-44b9-b560-677422d9004f.jpg" 
                  alt="FC Fashion Store" 
                  className="h-8 w-8 object-contain"
                />
                <h3 className="ml-2 text-lg font-bold font-montserrat">FC Fashion Store</h3>
              </div>
              <p className="text-gray-300">Ваш надежный партнер в мире моды</p>
            </div>
            
            <div>
              <h4 className="font-semibold font-montserrat mb-4">Каталог</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Одежда</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Аксессуары</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Текстиль</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-montserrat mb-4">Информация</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-white transition-colors">Доставка</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold font-montserrat mb-4">Контакты</h4>
              <p className="text-gray-300 mb-2">📞 +7 (999) 123-45-67</p>
              <p className="text-gray-300 mb-2">✉️ info@fcfashion.ru</p>
              <p className="text-gray-300">📍 Москва, ул. Модная, 1</p>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 FC Fashion Store. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Index;