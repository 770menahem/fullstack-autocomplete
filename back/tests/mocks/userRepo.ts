import { IUserDal } from '../../src/interfaces/DAL/userDal.interface';
import User from '../../src/types/user.type';

class UserRepoMock implements IUserDal {
    private users: User[] = [
        {
            _id: '1',
            name: 'test user',
            password: 'qiYCgeA3lHqOGYsQVCkmZA==',
        },
    ];
    public getById = async (userId: string): Promise<User | null> => {
        const user = this.users.find((u) => u._id === userId);
        return user ? ({ _id: user._id, name: user.name } as User) : null;
    };

    public getByNameAndPassword = async (name: string, password: string): Promise<User | null> => {
        const user = this.users.find((u) => u.name === name && u.password === password);
        return user ? ({ _id: user._id, name: user.name } as User) : null;
    };

    public create = async (user: User) => {
        this.users.push(user);
        return user;
    };

    public updateName = async (userId: string, name: string) => {
        const user: User | undefined = this.users.find((u) => u._id === userId);
        if (user) {
            user.name = name;
            return { _id: user._id, name: user.name } as User;
        }
        return null;
    };

    public delete = async (userId: string) => {
        const user = this.users.find((u) => u._id === userId);
        if (user) {
            this.users = this.users.filter((u) => u._id !== userId);
            return { _id: user._id, name: user.name } as User;
        }
        return null;
    };

    public get = async (userId: string) => {
        const user = this.users.find((u) => u._id === userId);
        return user ? ({ _id: user._id, name: user.name } as User) : null;
    };

    public getAll = async () => {
        return this.users.map((user) => ({ _id: user._id, name: user.name } as User));
    };
}

export default UserRepoMock;
