import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';

interface ProductDetailProps {
  productId: number;
  onGoBack: () => void;
  onAddToCart: (productId: number) => void;
  cart: { [key: number]: number };
}

const productDetails = {
  1: {
    id: 1,
    name: "Элегантное белое платье",
    price: 12990,
    originalPrice: 15990,
    image: "/img/9aa4de47-3518-4c29-93ca-85b2af66b7d2.jpg",
    category: "Одежда",
    rating: 4.8,
    reviews: 24,
    isSale: true,
    description: "Изысканное белое платье из премиального хлопка с элегантным силуэтом. Идеально подходит для особых случаев и торжественных мероприятий.",
    composition: "95% хлопок, 5% эластан",
    care: "Машинная стирка при 30°C, не отбеливать, гладить при средней температуре",
    sizes: ["XS", "S", "M", "L", "XL"],
    features: [
      "Свободный крой",
      "Натуральная ткань",
      "Гипоаллергенно",
      "Дышащий материал"
    ],
    delivery: {
      express: "1-2 дня - 500 ₽",
      standard: "3-5 дней - бесплатно",
      pickup: "Самовывоз - бесплатно"
    }
  },
  2: {
    id: 2,
    name: "Кожаная сумка",
    price: 8490,
    image: "/img/f9ac6380-3bac-4849-aa8a-844dea79d5f6.jpg",
    category: "Аксессуары",
    rating: 4.9,
    reviews: 18,
    isNew: true,
    description: "Роскошная кожаная сумка ручной работы из натуральной итальянской кожи. Практичная и стильная модель для современной женщины.",
    composition: "100% натуральная кожа (телячья)",
    care: "Обработка специальными средствами для кожи, избегать попадания влаги",
    colors: ["Коньячный", "Черный", "Бежевый"],
    features: [
      "Ручная работа",
      "Итальянская кожа",
      "Множество отделений",
      "Регулируемый ремень"
    ],
    delivery: {
      express: "1-2 дня - 500 ₽",
      standard: "3-5 дней - бесплатно",
      pickup: "Самовывоз - бесплатно"
    }
  },
  3: {
    id: 3,
    name: "Кашемировый шарф",
    price: 5990,
    image: "/img/8ec65299-bcd9-478a-b9ff-2ed6ce8f959f.jpg",
    category: "Текстиль",
    rating: 4.7,
    reviews: 31,
    description: "Невероятно мягкий кашемировый шарф премиум-качества. Идеальный аксессуар для холодного времени года.",
    composition: "100% кашемир",
    care: "Только химчистка или ручная стирка в холодной воде",
    dimensions: "180см x 70см",
    features: [
      "Премиум кашемир",
      "Ультра-мягкий",
      "Теплоизоляция",
      "Элегантный дизайн"
    ],
    delivery: {
      express: "1-2 дня - 500 ₽",
      standard: "3-5 дней - бесплатно",
      pickup: "Самовывоз - бесплатно"
    }
  },
  4: {
    id: 4,
    name: "Шелковая блузка",
    price: 9990,
    image: "/img/87c0a3ac-2d39-42a4-b90b-1b5364b49d85.jpg",
    category: "Одежда",
    rating: 4.6,
    reviews: 15,
    isNew: true,
    description: "Элегантная шелковая блузка цвета шампань с изысканным кроем. Создана для успешных и стильных женщин.",
    composition: "100% натуральный шелк",
    care: "Ручная стирка в прохладной воде, гладить через ткань",
    sizes: ["XS", "S", "M", "L"],
    features: [
      "Натуральный шелк",
      "Элегантный крой",
      "Дышащая ткань",
      "Роскошный блеск"
    ],
    delivery: {
      express: "1-2 дня - 500 ₽",
      standard: "3-5 дней - бесплатно",
      pickup: "Самовывоз - бесплатно"
    }
  },
  5: {
    id: 5,
    name: "Золотые серьги",
    price: 6490,
    image: "/img/0d50317a-cd94-4227-9cec-42328dac24a0.jpg",
    category: "Аксессуары",
    rating: 4.9,
    reviews: 27,
    description: "Утонченные золотые серьги минималистичного дизайна. Идеальное дополнение к любому образу.",
    composition: "Золото 585 пробы",
    care: "Протирать мягкой тканью, хранить в футляре",
    weight: "2.5 грамм (пара)",
    features: [
      "Золото 585 пробы",
      "Минималистичный дизайн",
      "Гипоаллергенно",
      "Ручная работа"
    ],
    delivery: {
      express: "1-2 дня - 500 ₽",
      standard: "3-5 дней - бесплатно",
      pickup: "Самовывоз - бесплатно"
    }
  }
};

const reviews = [
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

export default function ProductDetail({ productId, onGoBack, onAddToCart, cart }: ProductDetailProps) {
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  const product = productDetails[productId as keyof typeof productDetails];
  const productReviews = reviews.filter(review => review.productId === productId);

  if (!product) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Товар не найден</h2>
          <Button onClick={onGoBack}>Вернуться назад</Button>
        </div>
      </div>
    );
  }

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

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      onAddToCart(product.id);
    }
  };

  return (
    <div className="min-h-screen bg-background font-opensans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={onGoBack} className="mr-4">
              <Icon name="ArrowLeft" size={20} />
            </Button>
            <h1 className="text-xl font-bold font-montserrat text-foreground">
              {product.name}
            </h1>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="relative">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {product.isNew && (
                <Badge className="absolute top-4 left-4 bg-green-600">Новинка</Badge>
              )}
              {product.isSale && (
                <Badge className="absolute top-4 right-4 bg-red-600">Скидка</Badge>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold font-montserrat mb-2">{product.name}</h1>
              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center gap-1">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviews} отзывов)
                </span>
              </div>
              
              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {product.price.toLocaleString()} ₽
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">
                    {product.originalPrice.toLocaleString()} ₽
                  </span>
                )}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            {/* Size Selection */}
            {'sizes' in product && (
              <div>
                <h3 className="font-semibold mb-3">Размер:</h3>
                <div className="flex gap-2">
                  {product.sizes.map(size => (
                    <Button
                      key={size}
                      variant={selectedSize === size ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedSize(size)}
                    >
                      {size}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {'colors' in product && (
              <div>
                <h3 className="font-semibold mb-3">Цвет:</h3>
                <div className="flex gap-2">
                  {product.colors.map(color => (
                    <Button
                      key={color}
                      variant={selectedColor === color ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedColor(color)}
                    >
                      {color}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Количество:</h3>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  <Icon name="Minus" size={16} />
                </Button>
                <span className="w-12 text-center font-semibold">{quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Icon name="Plus" size={16} />
                </Button>
              </div>
            </div>

            {/* Add to Cart */}
            <Button 
              size="lg" 
              className="w-full"
              onClick={handleAddToCart}
            >
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Добавить в корзину - {(product.price * quantity).toLocaleString()} ₽
            </Button>

            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Особенности</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Icon name="Check" size={16} className="text-green-600" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Detailed Information Tabs */}
        <div className="mt-12">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Описание и состав</TabsTrigger>
              <TabsTrigger value="delivery">Доставка</TabsTrigger>
              <TabsTrigger value="reviews">Отзывы ({productReviews.length})</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div>
                    <h3 className="font-semibold mb-3">Состав:</h3>
                    <p className="text-muted-foreground">{product.composition}</p>
                  </div>
                  
                  <Separator />
                  
                  <div>
                    <h3 className="font-semibold mb-3">Уход:</h3>
                    <p className="text-muted-foreground">{product.care}</p>
                  </div>
                  
                  {'dimensions' in product && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3">Размеры:</h3>
                        <p className="text-muted-foreground">{product.dimensions}</p>
                      </div>
                    </>
                  )}
                  
                  {'weight' in product && (
                    <>
                      <Separator />
                      <div>
                        <h3 className="font-semibold mb-3">Вес:</h3>
                        <p className="text-muted-foreground">{product.weight}</p>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="delivery" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Варианты доставки:</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Zap" size={20} className="text-orange-500" />
                        <div>
                          <p className="font-medium">Экспресс-доставка</p>
                          <p className="text-sm text-muted-foreground">Быстрая доставка курьером</p>
                        </div>
                      </div>
                      <span className="font-semibold">{product.delivery.express}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="Truck" size={20} className="text-blue-500" />
                        <div>
                          <p className="font-medium">Обычная доставка</p>
                          <p className="text-sm text-muted-foreground">Доставка в удобное время</p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">{product.delivery.standard}</span>
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon name="MapPin" size={20} className="text-purple-500" />
                        <div>
                          <p className="font-medium">Самовывоз</p>
                          <p className="text-sm text-muted-foreground">Из пункта выдачи</p>
                        </div>
                      </div>
                      <span className="font-semibold text-green-600">{product.delivery.pickup}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <div className="space-y-4">
                {productReviews.length > 0 ? (
                  productReviews.map(review => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-2 mb-3">
                          {renderStars(review.rating)}
                          <span className="font-semibold">{review.name}</span>
                          <span className="text-sm text-muted-foreground">{review.date}</span>
                        </div>
                        <p className="text-muted-foreground italic">"{review.comment}"</p>
                      </CardContent>
                    </Card>
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-6 text-center">
                      <p className="text-muted-foreground">Пока нет отзывов для этого товара</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}