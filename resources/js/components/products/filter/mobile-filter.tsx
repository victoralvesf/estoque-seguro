import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { ProductFilters } from "."

export function MobileFilter() {
    return (
        <Drawer>
            <DrawerTrigger asChild>
                <div className="rounded-sm px-3 py-1 h-9 bg-secondary hover:bg-secondary/90 flex items-center justify-center">
                    Filtros
                </div>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="sr-only">Filtros</DrawerTitle>
                    <DrawerDescription className="sr-only">
                        Adicione filtros para a listagem de produtos.
                    </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter>

                <ProductFilters />

                <DrawerClose>
                    <Button variant="outline" className="w-full">Fechar</Button>
                </DrawerClose>
                </DrawerFooter>
            </DrawerContent>
        </Drawer>
    )
}
