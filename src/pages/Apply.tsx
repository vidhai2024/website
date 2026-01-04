import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, ArrowRight, Check, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';

type FormData = {
  founderName: string;
  email: string;
  companyName: string;
  country: string;
  website: string;
  problem: string;
  solution: string;
  customer: string;
  marketSize: string;
  technology: string;
  defensibility: string;
  stage: string;
  traction: string;
  fundingAmount: string;
  useOfFunds: string;
  whyInvest: string;
};

const initialFormData: FormData = {
  founderName: '',
  email: '',
  companyName: '',
  country: '',
  website: '',
  problem: '',
  solution: '',
  customer: '',
  marketSize: '',
  technology: '',
  defensibility: '',
  stage: '',
  traction: '',
  fundingAmount: '',
  useOfFunds: '',
  whyInvest: '',
};

type Question = {
  id: keyof FormData;
  label: string;
  placeholder: string;
  type: 'text' | 'email' | 'textarea' | 'select';
  options?: string[];
  required: boolean;
  maxLength?: number;
  section: string;
};

const questions: Question[] = [
  // FOUNDERS & COMPANY
  { id: 'founderName', label: 'What is your name?', placeholder: 'Full name', type: 'text', required: true, section: 'Founders & Company' },
  { id: 'email', label: 'What is your email address?', placeholder: 'you@example.com', type: 'email', required: true, section: 'Founders & Company' },
  { id: 'companyName', label: 'What is your company name?', placeholder: 'Company name', type: 'text', required: true, section: 'Founders & Company' },
  { id: 'country', label: 'Where is your company based?', placeholder: 'Country / Region', type: 'text', required: true, section: 'Founders & Company' },
  { id: 'website', label: 'Do you have a website?', placeholder: 'https://yourcompany.com (optional)', type: 'text', required: false, section: 'Founders & Company' },
  
  // PROBLEM & SOLUTION
  { id: 'problem', label: 'In one sentence, what problem are you solving?', placeholder: 'Describe the core problem...', type: 'text', required: true, maxLength: 200, section: 'Problem & Solution' },
  { id: 'solution', label: 'How are you solving it differently from existing solutions?', placeholder: 'Explain your unique approach...', type: 'textarea', required: true, section: 'Problem & Solution' },
  
  // MARKET
  { id: 'customer', label: 'Who is your primary customer?', placeholder: 'Describe your target customer', type: 'text', required: true, section: 'Market' },
  { id: 'marketSize', label: 'What is the size of the market you are targeting?', placeholder: 'TAM/SAM/SOM or approximate value', type: 'text', required: true, section: 'Market' },
  
  // TECHNOLOGY & DEFENSIBILITY
  { id: 'technology', label: 'What is your core technology or innovation?', placeholder: 'Describe your technology...', type: 'textarea', required: true, section: 'Technology & Defensibility' },
  { id: 'defensibility', label: 'What makes this defensible?', placeholder: 'IP, data, execution, partnerships, etc.', type: 'textarea', required: true, section: 'Technology & Defensibility' },
  
  // TRACTION & STATUS
  { id: 'stage', label: 'What is your current stage?', placeholder: 'Select your stage', type: 'select', options: ['Idea', 'Prototype', 'MVP', 'Early Revenue', 'Scaling'], required: true, section: 'Traction & Status' },
  { id: 'traction', label: 'Any traction or validation so far?', placeholder: 'Pilots, users, revenue, grants, LOIs...', type: 'textarea', required: true, section: 'Traction & Status' },
  
  // FUNDING
  { id: 'fundingAmount', label: 'How much capital are you raising now?', placeholder: 'e.g., ₹50 Lakhs, $500K', type: 'text', required: true, section: 'Funding' },
  { id: 'useOfFunds', label: 'What will you use the funds for?', placeholder: 'Top 2-3 items only', type: 'textarea', required: true, section: 'Funding' },
  
  // CLOSING
  { id: 'whyInvest', label: 'Why should we invest in you?', placeholder: 'Your conviction as a founder...', type: 'textarea', required: true, section: 'Closing' },
];

const Apply = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [direction, setDirection] = useState(1);

  const currentQuestion = questions[currentStep];
  const totalSteps = questions.length;
  const progress = ((currentStep + 1) / totalSteps) * 100;

  const isCurrentValid = () => {
    const value = formData[currentQuestion.id];
    if (!currentQuestion.required) return true;
    if (currentQuestion.type === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }
    return value.trim().length > 0;
  };

  const handleInputChange = (value: string) => {
    if (currentQuestion.maxLength && value.length > currentQuestion.maxLength) {
      return;
    }
    setFormData(prev => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps - 1) {
      setDirection(1);
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey && currentQuestion.type !== 'textarea') {
      e.preventDefault();
      if (isCurrentValid()) {
        if (currentStep === totalSteps - 1) {
          handleSubmit();
        } else {
          handleNext();
        }
      }
    }
  };

  const handleSubmit = async () => {
    if (!isCurrentValid()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_ACCESS_KEY_HERE', // Replace with your Web3Forms access key
          subject: `New Application: ${formData.companyName}`,
          from_name: formData.founderName,
          // Founders & Company
          'Founder Name': formData.founderName,
          'Email': formData.email,
          'Company Name': formData.companyName,
          'Country': formData.country,
          'Website': formData.website || 'Not provided',
          // Problem & Solution
          'Problem': formData.problem,
          'Solution': formData.solution,
          // Market
          'Primary Customer': formData.customer,
          'Market Size': formData.marketSize,
          // Technology & Defensibility
          'Core Technology': formData.technology,
          'Defensibility': formData.defensibility,
          // Traction & Status
          'Current Stage': formData.stage,
          'Traction': formData.traction,
          // Funding
          'Funding Amount': formData.fundingAmount,
          'Use of Funds': formData.useOfFunds,
          // Closing
          'Why Invest': formData.whyInvest,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 50 : -50,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -50 : 50,
      opacity: 0,
    }),
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-8"
          >
            <Check className="w-10 h-10 text-primary" />
          </motion.div>
          
          <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
            Application Received
          </h1>
          
          <p className="text-muted-foreground mb-8">
            Our team will review your application and reach out if there's a fit. 
            Thank you for considering Vidhai as your partner.
          </p>
          
          <Link to="/">
            <Button variant="heroOutline" size="lg">
              Return Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <Link to="/" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <span className="text-sm text-muted-foreground">
            Question {currentStep + 1} of {totalSteps}
          </span>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-40">
        <motion.div
          className="h-full bg-primary"
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 pt-20">
        <div className="w-full max-w-xl">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentStep}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="space-y-8"
            >
              {/* Section Label */}
              <motion.span
                className="text-xs uppercase tracking-widest text-primary font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                {currentQuestion.section}
              </motion.span>

              {/* Question */}
              <motion.h2
                className="font-display text-2xl md:text-4xl font-bold text-foreground"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                {currentQuestion.label}
              </motion.h2>

              {/* Input */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                {currentQuestion.type === 'select' ? (
                  <Select
                    value={formData[currentQuestion.id]}
                    onValueChange={handleInputChange}
                  >
                    <SelectTrigger className="w-full h-14 text-lg bg-transparent border-0 border-b-2 border-muted-foreground/20 rounded-none focus:border-primary focus:ring-0 transition-colors">
                      <SelectValue placeholder={currentQuestion.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      {currentQuestion.options?.map(option => (
                        <SelectItem key={option} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : currentQuestion.type === 'textarea' ? (
                  <Textarea
                    value={formData[currentQuestion.id]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    placeholder={currentQuestion.placeholder}
                    className="w-full min-h-[120px] text-lg bg-transparent border-0 border-b-2 border-muted-foreground/20 rounded-none focus:border-primary focus:ring-0 resize-none transition-colors placeholder:text-muted-foreground/50"
                    autoFocus
                  />
                ) : (
                  <Input
                    type={currentQuestion.type}
                    value={formData[currentQuestion.id]}
                    onChange={(e) => handleInputChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={currentQuestion.placeholder}
                    className="w-full h-14 text-lg bg-transparent border-0 border-b-2 border-muted-foreground/20 rounded-none focus:border-primary focus:ring-0 transition-colors placeholder:text-muted-foreground/50"
                    autoFocus
                  />
                )}
                
                {currentQuestion.maxLength && (
                  <p className="text-xs text-muted-foreground mt-2 text-right">
                    {formData[currentQuestion.id].length}/{currentQuestion.maxLength}
                  </p>
                )}
              </motion.div>

              {/* Navigation */}
              <motion.div
                className="flex items-center justify-between pt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <Button
                  variant="ghost"
                  onClick={handlePrevious}
                  disabled={currentStep === 0}
                  className="gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back
                </Button>

                {currentStep === totalSteps - 1 ? (
                  <Button
                    variant="hero"
                    onClick={handleSubmit}
                    disabled={!isCurrentValid() || isSubmitting}
                    className="gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Check className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    onClick={handleNext}
                    disabled={!isCurrentValid()}
                    className="gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                )}
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Apply;
