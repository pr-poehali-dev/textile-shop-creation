import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

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
    comment: "Очень довольна покупкой. Кожа мягкая, качество отличное.",
    date: "12 сентября 2024"
  },
  {
    id: 3,
    productId: 3,
    name: "Елена В.",
    rating: 4,
    comment: "Шарф очень мягкий и теплый. Рекомендую!",
    date: "10 сентября 2024"
  }
];

export default function Index() {
  const [cart, setCart] = useState<{ [key: number]: number }>({});
  const [selectedCategory, setSelectedCategory] = useState<string>('Все');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = ['Все', 'Одежда', 'Аксессуары', 'Текстиль'];

  const filteredProducts = selectedCategory === 'Все' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const addToCart = (productId: number) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + 1
    }));
  };

  const getTotalItems = () => {
    return Object.values(cart).reduce((sum, count) => sum + count, 0);
  };

  const getRecommendations = (currentProductId: number, category: string) => {
    return products
      .filter(product => product.id !== currentProductId && product.category === category)
      .slice(0, 2);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < Math.floor(rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-background font-opensans">
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
              <Button variant="outline" className="relative">
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
        </div>
        
        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-t animate-fade-in">
            <nav className="px-4 py-4 space-y-4">
              <a 
                href="#" 
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Главная
              </a>
              <a 
                href="#catalog" 
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Каталог
              </a>
              <a 
                href="#" 
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Одежда
              </a>
              <a 
                href="#" 
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Аксессуары
              </a>
              <a 
                href="#" 
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Текстиль
              </a>
              <a 
                href="#" 
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Контакты
              </a>
              <a 
                href="#" 
                className="block text-foreground hover:text-primary transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Доставка
              </a>
            </nav>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-secondary to-background py-12 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold font-montserrat text-foreground mb-6">
            Изысканный стиль
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto px-4">
            Откройте для себя коллекцию качественной одежды, аксессуаров и текстиля
          </p>
          <Button size="lg" className="text-lg px-8">
            Смотреть каталог
            <Icon name="ArrowRight" size={20} className="ml-2" />
          </Button>
        </div>
      </section>

      {/* Category Filter */}
      <section id="catalog" className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-4 justify-center mb-12">
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className="font-montserrat"
              >
                {category}
              </Button>
            ))}
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map(product => (
              <Card key={product.id} className="group hover:shadow-lg transition-all duration-300 animate-fade-in">
                <div className="relative overflow-hidden rounded-t-lg">
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
                  
                  <h3 className="text-lg font-semibold font-montserrat mb-2">{product.name}</h3>
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
                    className="w-full mb-4" 
                    onClick={() => addToCart(product.id)}
                  >
                    <Icon name="ShoppingCart" size={16} className="mr-2" />
                    В корзину
                  </Button>
                  
                  {/* Recommendations */}
                  {getRecommendations(product.id, product.category).length > 0 && (
                    <div className="border-t pt-4">
                      <h4 className="text-sm font-semibold text-muted-foreground mb-3">
                        Вам может понравиться
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {getRecommendations(product.id, product.category).map(rec => (
                          <div key={rec.id} className="group cursor-pointer">
                            <div className="relative overflow-hidden rounded-md mb-2">
                              <img
                                src={rec.image}
                                alt={rec.name}
                                className="w-full h-20 object-cover group-hover:scale-105 transition-transform duration-200"
                              />
                              {rec.isNew && (
                                <Badge className="absolute top-1 left-1 text-xs h-5 bg-green-600">Новинка</Badge>
                              )}
                            </div>
                            <h5 className="text-xs font-medium text-foreground truncate mb-1">
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
                    <span className="font-semibold">{review.name}</span>
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