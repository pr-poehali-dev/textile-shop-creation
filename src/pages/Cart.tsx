import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';

interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  quantity: number;
}

interface CartPageProps {
  cart: { [key: number]: number };
  onUpdateCart: (cart: { [key: number]: number }) => void;
  onGoBack: () => void;
}

const products = [
  {
    id: 1,
    name: "Элегантное белое платье",
    price: 12990,
    image: "/img/9aa4de47-3518-4c29-93ca-85b2af66b7d2.jpg",
    category: "Одежда"
  },
  {
    id: 2,
    name: "Кожаная сумка",
    price: 8490,
    image: "/img/f9ac6380-3bac-4849-aa8a-844dea79d5f6.jpg",
    category: "Аксессуары"
  },
  {
    id: 3,
    name: "Кашемировый шарф",
    price: 5990,
    image: "/img/8ec65299-bcd9-478a-b9ff-2ed6ce8f959f.jpg",
    category: "Текстиль"
  },
  {
    id: 4,
    name: "Шелковая блузка",
    price: 9990,
    image: "/img/87c0a3ac-2d39-42a4-b90b-1b5364b49d85.jpg",
    category: "Одежда"
  },
  {
    id: 5,
    name: "Золотые серьги",
    price: 6490,
    image: "/img/0d50317a-cd94-4227-9cec-42328dac24a0.jpg",
    category: "Аксессуары"
  }
];

export default function Cart({ cart, onUpdateCart, onGoBack }: CartPageProps) {
  const [isOrderFormVisible, setIsOrderFormVisible] = useState(false);
  const [orderForm, setOrderForm] = useState({
    name: '',
    phone: '',
    email: '',
    address: ''
  });

  const cartItems: CartItem[] = Object.entries(cart)
    .map(([productId, quantity]) => {
      const product = products.find(p => p.id === parseInt(productId));
      return product ? {
        ...product,
        quantity
      } : null;
    })
    .filter(Boolean) as CartItem[];

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      const newCart = { ...cart };
      delete newCart[productId];
      onUpdateCart(newCart);
    } else {
      onUpdateCart({
        ...cart,
        [productId]: newQuantity
      });
    }
  };

  const removeItem = (productId: number) => {
    const newCart = { ...cart };
    delete newCart[productId];
    onUpdateCart(newCart);
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Спасибо за заказ! Мы свяжемся с вами в ближайшее время.');
    setIsOrderFormVisible(false);
    onUpdateCart({});
    setOrderForm({ name: '', phone: '', email: '', address: '' });
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background font-opensans">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <Button variant="ghost" onClick={onGoBack} className="mr-4">
                  <Icon name="ArrowLeft" size={20} />
                </Button>
                <h1 className="text-2xl font-bold font-montserrat text-foreground">Корзина</h1>
              </div>
            </div>
          </div>
        </header>

        {/* Empty Cart */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <Icon name="ShoppingCart" size={64} className="mx-auto text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold font-montserrat mb-4">Корзина пуста</h2>
            <p className="text-muted-foreground mb-8">Добавьте товары из каталога</p>
            <Button onClick={onGoBack} size="lg">
              <Icon name="ArrowLeft" size={20} className="mr-2" />
              Вернуться к покупкам
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background font-opensans">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button variant="ghost" onClick={onGoBack} className="mr-4">
                <Icon name="ArrowLeft" size={20} />
              </Button>
              <h1 className="text-2xl font-bold font-montserrat text-foreground">Корзина</h1>
              <Badge className="ml-4">{getTotalItems()} товаров</Badge>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map(item => (
                <Card key={item.id} className="animate-fade-in">
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full sm:w-24 h-24 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold font-montserrat">{item.name}</h3>
                            <p className="text-sm text-muted-foreground">{item.category}</p>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Icon name="Minus" size={14} />
                            </Button>
                            <span className="w-12 text-center font-semibold">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Icon name="Plus" size={14} />
                            </Button>
                          </div>
                          
                          <div className="text-right">
                            <p className="text-lg font-bold text-primary">
                              {(item.price * item.quantity).toLocaleString()} ₽
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {item.price.toLocaleString()} ₽ за шт.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle className="font-montserrat">Итого</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>Товары ({getTotalItems()})</span>
                  <span>{getTotalPrice().toLocaleString()} ₽</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Доставка</span>
                  <span className="text-green-600">Бесплатно</span>
                </div>
                
                <Separator />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>К оплате</span>
                  <span className="text-primary">{getTotalPrice().toLocaleString()} ₽</span>
                </div>
                
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => setIsOrderFormVisible(true)}
                >
                  Оформить заказ
                </Button>
                
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={onGoBack}
                >
                  <Icon name="ArrowLeft" size={16} className="mr-2" />
                  Продолжить покупки
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Order Form Modal */}
        {isOrderFormVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <Card className="w-full max-w-md animate-scale-in">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="font-montserrat">Оформление заказа</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOrderFormVisible(false)}
                  >
                    <Icon name="X" size={20} />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleOrderSubmit} className="space-y-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Имя *</label>
                    <Input
                      required
                      value={orderForm.name}
                      onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                      placeholder="Введите ваше имя"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Телефон *</label>
                    <Input
                      required
                      type="tel"
                      value={orderForm.phone}
                      onChange={(e) => setOrderForm({...orderForm, phone: e.target.value})}
                      placeholder="+7 (999) 123-45-67"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={orderForm.email}
                      onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium mb-2 block">Адрес доставки *</label>
                    <Input
                      required
                      value={orderForm.address}
                      onChange={(e) => setOrderForm({...orderForm, address: e.target.value})}
                      placeholder="Город, улица, дом, квартира"
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span>Итого:</span>
                    <span className="text-primary">{getTotalPrice().toLocaleString()} ₽</span>
                  </div>
                  
                  <Button type="submit" className="w-full" size="lg">
                    Подтвердить заказ
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}