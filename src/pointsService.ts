import { useState, useEffect } from 'react';

export interface PointsData {
  totalPoints: number;
  earnedThisMonth: number;
  usedThisMonth: number;
  tierLevel: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  nextTierPoints: number;
}

export interface PointsTransaction {
  id: string;
  type: 'earned' | 'redeemed';
  amount: number;
  description: string;
  date: string;
}

class PointsService {
  private static instance: PointsService;
  private listeners: ((data: PointsData) => void)[] = [];
  private pointsData: PointsData = {
    totalPoints: 2450,
    earnedThisMonth: 350,
    usedThisMonth: 150,
    tierLevel: 'Silver',
    nextTierPoints: 550, // Points needed to reach Gold (3000)
  };

  private transactions: PointsTransaction[] = [
    {
      id: '1',
      type: 'earned',
      amount: 100,
      description: 'Pet grooming service',
      date: '2024-09-20',
    },
    {
      id: '2',
      type: 'earned',
      amount: 50,
      description: 'App check-in bonus',
      date: '2024-09-19',
    },
    {
      id: '3',
      type: 'redeemed',
      amount: 200,
      description: 'Free grooming voucher',
      date: '2024-09-18',
    },
    {
      id: '4',
      type: 'earned',
      amount: 75,
      description: 'Vaccination service',
      date: '2024-09-17',
    },
  ];

  static getInstance(): PointsService {
    if (!PointsService.instance) {
      PointsService.instance = new PointsService();
    }
    return PointsService.instance;
  }

  subscribe(callback: (data: PointsData) => void): () => void {
    this.listeners.push(callback);
    // Immediately call with current data
    callback(this.pointsData);

    // Return unsubscribe function
    return () => {
      this.listeners = this.listeners.filter(listener => listener !== callback);
    };
  }

  getPointsData(): PointsData {
    return { ...this.pointsData };
  }

  getTransactions(): PointsTransaction[] {
    return [...this.transactions];
  }

  addPoints(amount: number, description: string): void {
    const transaction: PointsTransaction = {
      id: Date.now().toString(),
      type: 'earned',
      amount,
      description,
      date: new Date().toISOString().split('T')[0],
    };

    this.transactions.unshift(transaction);
    this.pointsData.totalPoints += amount;
    this.pointsData.earnedThisMonth += amount;

    // Update tier if necessary
    this.updateTier();
    this.notifyListeners();
  }

  redeemPoints(amount: number, description: string): boolean {
    if (this.pointsData.totalPoints < amount) {
      return false; // Insufficient points
    }

    const transaction: PointsTransaction = {
      id: Date.now().toString(),
      type: 'redeemed',
      amount,
      description,
      date: new Date().toISOString().split('T')[0],
    };

    this.transactions.unshift(transaction);
    this.pointsData.totalPoints -= amount;
    this.pointsData.usedThisMonth += amount;

    this.updateTier();
    this.notifyListeners();
    return true;
  }

  private updateTier(): void {
    const points = this.pointsData.totalPoints;

    if (points >= 5000) {
      this.pointsData.tierLevel = 'Platinum';
      this.pointsData.nextTierPoints = 0; // Max tier
    } else if (points >= 3000) {
      this.pointsData.tierLevel = 'Gold';
      this.pointsData.nextTierPoints = 5000 - points;
    } else if (points >= 1500) {
      this.pointsData.tierLevel = 'Silver';
      this.pointsData.nextTierPoints = 3000 - points;
    } else {
      this.pointsData.tierLevel = 'Bronze';
      this.pointsData.nextTierPoints = 1500 - points;
    }
  }

  private notifyListeners(): void {
    this.listeners.forEach(callback => callback(this.pointsData));
  }
}

// Custom hook for using points in React components
export function usePoints() {
  const [pointsData, setPointsData] = useState<PointsData>({
    totalPoints: 0,
    earnedThisMonth: 0,
    usedThisMonth: 0,
    tierLevel: 'Bronze',
    nextTierPoints: 1500,
  });

  useEffect(() => {
    const pointsService = PointsService.getInstance();
    const unsubscribe = pointsService.subscribe(setPointsData);
    return unsubscribe;
  }, []);

  const addPoints = (amount: number, description: string) => {
    PointsService.getInstance().addPoints(amount, description);
  };

  const redeemPoints = (amount: number, description: string): boolean => {
    return PointsService.getInstance().redeemPoints(amount, description);
  };

  const getTransactions = (): PointsTransaction[] => {
    return PointsService.getInstance().getTransactions();
  };

  return {
    pointsData,
    addPoints,
    redeemPoints,
    getTransactions,
  };
}

export default PointsService;