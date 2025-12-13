import { NextResponse, type NextRequest } from 'next/server';
import bcrypt from 'bcryptjs';
import { signJwt } from '@/utils/jwt';
import AppDataSource from '@/db/AppDataSource';
import { User } from '@/db/entity/User.entity';
import { dbInit, dbClose } from '@/db/AppDataSource';

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    console.log('=== LOGIN API START ===');
    console.log('Request received at /api/auth/login');

    // Инициализируем соединение с базой
    console.log('Initializing database connection...');
    await dbInit();
    console.log('Database initialized successfully');

    const body = await request.json();
    const { email, password } = body ?? {};

    console.log('Parsed request body:', { email: email ? 'PRESENT' : 'MISSING', password: password ? 'PRESENT' : 'MISSING' });

    if (!email || !password) {
      console.log('Missing email or password, returning 400');
      return NextResponse.json(
        { message: 'Укажите email и пароль' },
        { status: 400 },
      );
    }

    // Ищем пользователя
    console.log('Looking up user with email:', email);
    const userRepository = AppDataSource.getRepository(User);
    const user = await userRepository.findOne({
      where: { email },
    });

    console.log('User lookup result:', user ? 'USER FOUND' : 'USER NOT FOUND');

    if (!user) {
      return NextResponse.json(
        { message: 'Пользователь не найден' },
        { status: 401 },
      );
    }

    // Проверяем пароль
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { message: 'Неверный пароль' },
        { status: 401 },
      );
    }

    if (!user.isActive) {
      return NextResponse.json(
        { message: 'Пользователь деактивирован' },
        { status: 401 },
      );
    }

    // Создаем JWT токен
    const token = signJwt({
      sub: user.id,
      email: user.email,
      fullName: user.fullName,
      isActive: user.isActive,
    });

    const response = NextResponse.json({
      message: 'Авторизация успешна',
      token,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        isActive: user.isActive,
      },
    });

    // Устанавливаем httpOnly куку
    response.cookies.set({
      name: 'accessToken',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60, // 1 час
    });

    console.log('Login successful for user:', user.email);
    return response;
  }
  catch (error) {
    console.error('=== LOGIN ERROR ===');
    console.error('Error details:', error);
    console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
    console.log('==================');
    return NextResponse.json(
      { message: 'Ошибка сервера при авторизации', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 },
    );
  } finally {
    // Закрываем соединение в serverless среде
    console.log('Closing database connection...');
    if (process.env.NODE_ENV === 'production') {
      await dbClose();
    }
    console.log('=== LOGIN API END ===');
  }
}