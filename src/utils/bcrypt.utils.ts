import * as bcrypt from 'bcrypt';

export const HashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password.trim(), salt);
    return hash.trim();
}

export const ComparePassword = async (password: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(password.trim(), hash.trim());
}