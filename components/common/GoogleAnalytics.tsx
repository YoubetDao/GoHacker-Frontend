'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initGA, logPageView } from '@/lib/gtag';

export default function GoogleAnalytics() {
  const pathname = usePathname();

  useEffect(() => {
    // 初始化 GA
    initGA();
  }, []);

  useEffect(() => {
    // 路由变化时记录页面访问
    if (pathname) {
      logPageView();
    }
  }, [pathname]);

  return null;
}