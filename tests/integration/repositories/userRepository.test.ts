import prisma from '../prisma';

afterAll(async () => {
  const deleteUsers = prisma.user.deleteMany();

  await prisma.$transaction([deleteUsers]);

  await prisma.$disconnect();
});

describe('createUserAction() - integration', () => {
  it('fails to create user with already existing email address', async () => {
    const user = {
      id: 1,
      fullName: 'Rich',
      email: 'hello@prisma.io',
      password: 'password',
    };

    await prisma.user.create({
      data: {
        fullName: user.fullName,
        email: user.email,
        password: user.password,
      },
    });

    const allUsers = await prisma.user.findMany();

    console.log({ allUsers });

    expect(allUsers.length).toBeGreaterThan(0);

    const createdUser = await prisma.user.findFirst({
      where: { email: user.email },
    });

    expect(createdUser).toHaveProperty('id');
    expect(createdUser).toHaveProperty('fullName', user.fullName);
    expect(createdUser).toHaveProperty('email', user.email);
    expect(createdUser).toHaveProperty('password', user.password);
    expect(createdUser).toHaveProperty('createdAt');
    expect(createdUser).toHaveProperty('updatedAt');

    expect(
      prisma.user.create({
        data: {
          fullName: user.fullName,
          email: user.email,
          password: user.password,
        },
      })
    ).rejects.toThrow('Unique constraint failed on the fields: (`email`)');
  });
});
