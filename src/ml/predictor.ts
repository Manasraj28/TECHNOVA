import { Transaction } from '../types';

export function predictMonthlyExpense(transactions: Transaction[]): number {
  const now = new Date();
  const last3Months: number[] = [];

  for (let i = 1; i <= 3; i++) {
    const month = now.getMonth() - i;
    const year = month < 0 ? now.getFullYear() - 1 : now.getFullYear();
    const adjustedMonth = (month + 12) % 12;

    const total = transactions
      .filter(t => {
        const d = new Date(t.date);
        return d.getMonth() === adjustedMonth && d.getFullYear() === year && t.type === 'expense';
      })
      .reduce((sum, t) => sum + t.amount, 0);

    last3Months.push(total);
  }

  const average = last3Months.reduce((a, b) => a + b, 0) / last3Months.length;
  return Math.round(average);
}
