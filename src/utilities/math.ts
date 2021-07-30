class MathUtils {
    /**
     * Constrains a value to be between to other values
     * @param min 
     * @param max 
     * @param val 
     * @returns 
     */
    public static clamp(min: number, max: number, val: number): number {

        return Math.max(min, Math.min(max, val));
    };

    /**
     * Normalize a value between two bounds in the context of [-1,1]
     * @param lBound 
     * @param uBound 
     * @param val 
     * @returns 
     */
    public static normalize(lBound: number, uBound: number, val: number): number {
        let avg = (lBound + uBound) / 2;
        let range = (uBound - lBound) / 2;

        return (val - avg) / range;
    };
}

export default MathUtils;