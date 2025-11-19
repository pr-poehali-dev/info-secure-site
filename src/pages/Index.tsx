import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Icon from '@/components/ui/icon';
import { toast } from 'sonner';

interface Article {
  id: string;
  title: string;
  description: string;
  content: string;
  icon: string;
  read: boolean;
}

interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

interface Test {
  id: string;
  title: string;
  description: string;
  questions: Question[];
  completed: boolean;
  score?: number;
}

const Index = () => {
  const [currentTest, setCurrentTest] = useState<string | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [testScore, setTestScore] = useState(0);

  const [articles] = useState<Article[]>([
    {
      id: '1',
      title: 'Защита персональных данных',
      description: 'Узнайте, как защитить свои личные данные в интернете',
      icon: 'UserCheck',
      read: true,
      content: 'Персональные данные — это любая информация, которая может идентифицировать конкретного человека. Важно понимать, какие данные вы предоставляете онлайн и как их защитить. Основные правила: не делитесь паролями, используйте двухфакторную аутентификацию, будьте осторожны с публичными Wi-Fi сетями, регулярно обновляйте программное обеспечение.'
    },
    {
      id: '2',
      title: 'Создание надежных паролей',
      description: 'Научитесь создавать и управлять сложными паролями',
      icon: 'Lock',
      read: true,
      content: 'Надежный пароль должен содержать минимум 12 символов, включая заглавные и строчные буквы, цифры и специальные символы. Никогда не используйте одинаковые пароли для разных сервисов. Рекомендуется использовать менеджеры паролей для безопасного хранения. Избегайте очевидных комбинаций типа "12345" или "password".'
    },
    {
      id: '3',
      title: 'Борьба с фишингом',
      description: 'Распознавайте и избегайте фишинговые атаки',
      icon: 'Mail',
      read: false,
      content: 'Фишинг — это мошенническая попытка получить конфиденциальную информацию под видом доверенного источника. Признаки фишинга: подозрительный адрес отправителя, орфографические ошибки, срочность действий, запрос личных данных. Всегда проверяйте URL-адреса перед вводом данных и не переходите по подозрительным ссылкам.'
    },
  ]);

  const [tests, setTests] = useState<Test[]>([
    {
      id: '1',
      title: 'Основы информационной безопасности',
      description: 'Проверьте свои базовые знания',
      completed: false,
      questions: [
        {
          id: 'q1',
          question: 'Что такое двухфакторная аутентификация?',
          options: [
            'Использование двух паролей',
            'Подтверждение входа двумя способами',
            'Вход с двух устройств',
            'Использование двух браузеров'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2',
          question: 'Какой минимальный размер пароля рекомендуется?',
          options: ['6 символов', '8 символов', '12 символов', '16 символов'],
          correctAnswer: 2
        },
        {
          id: 'q3',
          question: 'Что НЕ является признаком фишинга?',
          options: [
            'Срочные запросы действий',
            'Официальный домен компании',
            'Орфографические ошибки',
            'Запрос личных данных'
          ],
          correctAnswer: 1
        },
        {
          id: 'q4',
          question: 'Как часто нужно обновлять программное обеспечение?',
          options: [
            'Раз в год',
            'По возможности сразу после выхода обновлений',
            'Никогда',
            'Раз в месяц'
          ],
          correctAnswer: 1
        },
        {
          id: 'q5',
          question: 'Безопасно ли использовать публичный Wi-Fi для банковских операций?',
          options: ['Да, всегда', 'Нет, без VPN небезопасно', 'Только днём', 'Да, если сеть быстрая'],
          correctAnswer: 1
        }
      ]
    },
    {
      id: '2',
      title: 'Безопасное поведение в сети',
      description: 'Тест на знание правил безопасности',
      completed: false,
      questions: [
        {
          id: 'q1',
          question: 'Что делать, если получили подозрительное письмо от банка?',
          options: [
            'Сразу перейти по ссылке',
            'Проверить адрес отправителя и связаться с банком напрямую',
            'Ответить на письмо',
            'Удалить и забыть'
          ],
          correctAnswer: 1
        },
        {
          id: 'q2',
          question: 'Можно ли публиковать личные фото в открытом доступе?',
          options: [
            'Да, всегда',
            'Нет, никогда',
            'Можно, но лучше ограничить доступ',
            'Только селфи'
          ],
          correctAnswer: 2
        },
        {
          id: 'q3',
          question: 'Что такое VPN?',
          options: [
            'Вирус',
            'Виртуальная частная сеть для безопасного соединения',
            'Браузер',
            'Антивирус'
          ],
          correctAnswer: 1
        },
        {
          id: 'q4',
          question: 'Нужно ли разные пароли для разных сайтов?',
          options: [
            'Нет, один пароль удобнее',
            'Да, это критически важно',
            'Только для банков',
            'Не имеет значения'
          ],
          correctAnswer: 1
        }
      ]
    }
  ]);

  const [glossary] = useState([
    { term: 'Фишинг', definition: 'Вид интернет-мошенничества, целью которого является получение доступа к конфиденциальным данным пользователей' },
    { term: 'Вредоносное ПО', definition: 'Программное обеспечение, предназначенное для получения несанкционированного доступа к ресурсам компьютера' },
    { term: 'Двухфакторная аутентификация', definition: 'Метод идентификации пользователя с использованием двух различных типов аутентификационных данных' },
    { term: 'VPN', definition: 'Virtual Private Network - технология, обеспечивающая защищённое сетевое соединение поверх незащищённой сети' },
    { term: 'Брандмауэр', definition: 'Программное или аппаратное обеспечение для контроля и фильтрации сетевого трафика' },
    { term: 'Шифрование', definition: 'Процесс преобразования информации в код для предотвращения несанкционированного доступа' },
    { term: 'SSL/TLS', definition: 'Криптографические протоколы для обеспечения безопасной передачи данных в интернете' },
    { term: 'Социальная инженерия', definition: 'Метод получения конфиденциальной информации путём манипуляции людьми' },
  ]);

  const startTest = (testId: string) => {
    setCurrentTest(testId);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setTestScore(0);
  };

  const handleAnswer = () => {
    if (selectedAnswer === null) return;

    const test = tests.find(t => t.id === currentTest);
    if (!test) return;

    const question = test.questions[currentQuestion];
    if (selectedAnswer === question.correctAnswer) {
      setTestScore(testScore + 1);
      toast.success('Правильно!');
    } else {
      toast.error('Неверно', {
        description: 'Попробуйте ещё раз!'
      });
    }

    if (currentQuestion < test.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      const finalScore = Math.round((testScore + (selectedAnswer === question.correctAnswer ? 1 : 0)) / test.questions.length * 100);
      
      setTests(tests.map(t => 
        t.id === currentTest 
          ? { ...t, completed: true, score: finalScore }
          : t
      ));

      toast.success(`Тест завершён! Результат: ${finalScore}%`, {
        description: `Правильных ответов: ${testScore + (selectedAnswer === question.correctAnswer ? 1 : 0)} из ${test.questions.length}`
      });

      setCurrentTest(null);
      setCurrentQuestion(0);
      setTestScore(0);
    }
  };

  const completedTests = tests.filter(t => t.completed).length;
  const totalTests = tests.length;
  const progressPercent = totalTests > 0 ? Math.round((completedTests / totalTests) * 100) : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg">
                <Icon name="Shield" size={28} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Информационная безопасность
                </h1>
                <p className="text-sm text-muted-foreground">Обучающий портал</p>
              </div>
            </div>

          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-in">
          <Card className="border-2 border-primary/20 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Icon name="GraduationCap" className="text-secondary" />
                Ваш прогресс обучения
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">Пройдено тестов: {completedTests} из {totalTests}</span>
                    <span className="text-sm font-bold text-primary">{progressPercent}%</span>
                  </div>
                  <Progress value={progressPercent} className="h-3" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center">
                      <Icon name="BookOpen" size={24} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold">Статьи</p>
                      <p className="text-sm text-muted-foreground">{articles.length} материалов</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-secondary/10 to-secondary/5 rounded-lg border border-secondary/20">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center">
                      <Icon name="FileQuestion" size={24} className="text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold">Тесты</p>
                      <p className="text-sm text-muted-foreground">{completedTests}/{totalTests} пройдено</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg border border-accent/20">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center">
                      <Icon name="Book" size={24} className="text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold">Глоссарий</p>
                      <p className="text-sm text-muted-foreground">{glossary.length} терминов</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="articles" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 h-auto p-1">
            <TabsTrigger value="articles" className="flex items-center gap-2 py-3">
              <Icon name="BookOpen" size={18} />
              <span className="hidden sm:inline">Статьи</span>
            </TabsTrigger>
            <TabsTrigger value="tests" className="flex items-center gap-2 py-3">
              <Icon name="FileQuestion" size={18} />
              <span className="hidden sm:inline">Тесты</span>
            </TabsTrigger>
            <TabsTrigger value="glossary" className="flex items-center gap-2 py-3">
              <Icon name="Book" size={18} />
              <span className="hidden sm:inline">Глоссарий</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="articles" className="space-y-4 animate-fade-in">
            {articles.map((article, index) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-primary/20 to-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Icon name={article.icon as any} size={28} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <CardTitle className="text-xl">{article.title}</CardTitle>
                        {article.read && (
                          <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30">
                            <Icon name="Check" size={14} className="mr-1" />
                            Прочитано
                          </Badge>
                        )}
                      </div>
                      <CardDescription>{article.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible>
                    <AccordionItem value="content" className="border-none">
                      <AccordionTrigger className="text-primary hover:text-primary/80 py-2">
                        Читать статью
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed pt-4">
                        {article.content}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="tests" className="space-y-4 animate-fade-in">
            {currentTest ? (
              <Card className="border-2 border-primary/20 shadow-xl animate-scale-in">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    {tests.find(t => t.id === currentTest)?.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 mt-2">
                    <Progress value={(currentQuestion / tests.find(t => t.id === currentTest)!.questions.length) * 100} className="flex-1" />
                    <span className="text-sm font-medium">
                      {currentQuestion + 1} / {tests.find(t => t.id === currentTest)?.questions.length}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">
                      {tests.find(t => t.id === currentTest)?.questions[currentQuestion].question}
                    </h3>
                    <div className="space-y-2">
                      {tests.find(t => t.id === currentTest)?.questions[currentQuestion].options.map((option, index) => (
                        <Button
                          key={index}
                          variant={selectedAnswer === index ? "default" : "outline"}
                          className="w-full justify-start text-left h-auto py-4 px-6"
                          onClick={() => setSelectedAnswer(index)}
                        >
                          <span className="font-medium mr-3">{String.fromCharCode(65 + index)}.</span>
                          {option}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleAnswer} disabled={selectedAnswer === null} className="flex-1">
                      {currentQuestion < tests.find(t => t.id === currentTest)!.questions.length - 1 
                        ? 'Следующий вопрос' 
                        : 'Завершить тест'}
                    </Button>
                    <Button variant="outline" onClick={() => setCurrentTest(null)}>
                      Отменить
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              tests.map((test, index) => (
                <Card key={test.id} className="hover:shadow-lg transition-shadow animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl mb-2">{test.title}</CardTitle>
                        <CardDescription>{test.description}</CardDescription>
                        <div className="flex items-center gap-2 mt-3">
                          <Badge variant="outline">
                            <Icon name="HelpCircle" size={14} className="mr-1" />
                            {test.questions.length} вопросов
                          </Badge>
                          {test.completed && test.score !== undefined && (
                            <Badge className={test.score >= 90 ? "bg-accent" : test.score >= 70 ? "bg-primary" : "bg-secondary"}>
                              <Icon name="Award" size={14} className="mr-1" />
                              {test.score}%
                            </Badge>
                          )}
                        </div>
                      </div>
                      <Button onClick={() => startTest(test.id)} size="lg">
                        {test.completed ? 'Пройти снова' : 'Начать тест'}
                        <Icon name="ArrowRight" size={18} className="ml-2" />
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="glossary" className="animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Icon name="BookMarked" className="text-primary" />
                  Глоссарий терминов
                </CardTitle>
                <CardDescription>
                  Основные термины информационной безопасности
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {glossary.map((item, index) => (
                    <div key={index} className="p-4 bg-muted/30 rounded-lg border border-muted animate-slide-up" style={{ animationDelay: `${index * 0.05}s` }}>
                      <h4 className="font-semibold text-lg text-primary mb-2">{item.term}</h4>
                      <p className="text-muted-foreground leading-relaxed">{item.definition}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <footer className="bg-white/80 backdrop-blur-sm border-t border-blue-100 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left">
            <div>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 justify-center md:justify-start">
                <Icon name="Mail" size={20} className="text-primary" />
                Контакты
              </h3>
              <p className="text-sm text-muted-foreground">info@security-edu.ru</p>
              <p className="text-sm text-muted-foreground">+7 (800) 555-35-35</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 justify-center md:justify-start">
                <Icon name="BookOpen" size={20} className="text-primary" />
                Обучение
              </h3>
              <p className="text-sm text-muted-foreground">3 статьи</p>
              <p className="text-sm text-muted-foreground">2 теста</p>
              <p className="text-sm text-muted-foreground">8 терминов</p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-2 flex items-center gap-2 justify-center md:justify-start">
                <Icon name="Users" size={20} className="text-primary" />
                Сообщество
              </h3>
              <p className="text-sm text-muted-foreground">Присоединяйтесь к обучению</p>
              <p className="text-sm text-muted-foreground">Делитесь знаниями</p>
            </div>
          </div>
          <div className="text-center mt-8 pt-6 border-t border-blue-100">
            <p className="text-sm text-muted-foreground">
              © 2024 Информационная безопасность. Образовательный портал.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;