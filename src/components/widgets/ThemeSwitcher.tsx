import { useState, useEffect } from "react";
import { Switch } from "@heroui/react";
import { Moon, Sun } from "@gravity-ui/icons";

export const ThemeSwitcher = () => {


    const [isSelected, setIsSelected] = useState(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("theme");
            if (saved) return saved === "dark";

            return true;
        }
        return true;
    });


    useEffect(() => {
        const root = document.documentElement;
        const theme = isSelected ? "dark" : "light";

        if (isSelected) {
            root.classList.add("dark");
        } else {
            root.classList.remove("dark");
        }

        localStorage.setItem("theme", theme);
    }, [isSelected]);
    return (
        <>
            <Switch
                onChange={setIsSelected}
                isSelected={isSelected}
            >
                <>
                    <Switch.Control className={isSelected ? "bg-foreground/20" : ""}>
                        <Switch.Thumb>
                            <Switch.Icon>
                                {isSelected ? (
                                    <Moon className="size-3 text-inherit opacity-100" />
                                ) : (
                                    <Sun className="size-3 text-inherit opacity-70" />
                                )}
                            </Switch.Icon>
                        </Switch.Thumb>
                    </Switch.Control>
                </>
            </Switch>

        </>
    );
};