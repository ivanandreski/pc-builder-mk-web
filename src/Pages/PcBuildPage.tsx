import React, { FunctionComponent, useState, useEffect } from "react";
import SummaryCard from "../Components/SummaryCard";
import PcBuildDialog from "../Components/Dialogs/PcBuildDialog";
import { PcBuildService } from "../Services/PcBuildService";
import { PcBuild } from "../Models/PcBuild";
import SelectedProductCard from "../Components/SelectedProductCard";
import { Product } from "../Models/Product";

const PcBuildPage: FunctionComponent = () => {
  const pcBuildService: PcBuildService = PcBuildService.getInstance();

  const [pcBuild, setPcBuild] = useState<PcBuild>();
  const [isLoading, setIsLoading] = useState(true);
  const [showDialog, setShowDialog] = useState(
    localStorage.getItem("user") == undefined || !window.navigator.onLine
  );

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    setPcBuild(await pcBuildService.fetchPcBuild());
    setIsLoading(false);
  };

  const handleRemove = async (product: Product) => {
    const result = await pcBuildService.removeProduct(product);
    setPcBuild(result);
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : (
    <div>
      <SummaryCard
        totalPrice={pcBuild?.totalPrice() || 0}
        compatible={pcBuild?.isCompatible() || false}
      />
      {pcBuild?.motherboard && (
        <SelectedProductCard
          title="Motherboard"
          product={pcBuild.motherboard}
          handleRemove={handleRemove}
        />
      )}
      {pcBuild?.processor && (
        <SelectedProductCard
          title="Processor"
          product={pcBuild.processor}
          handleRemove={handleRemove}
        />
      )}
      {pcBuild?.ram && (
        <SelectedProductCard
          title="RAM"
          product={pcBuild.ram}
          handleRemove={handleRemove}
        />
      )}
      {pcBuild?.graphicsCard && (
        <SelectedProductCard
          title="Graphics Card"
          product={pcBuild.graphicsCard}
          handleRemove={handleRemove}
        />
      )}
      {pcBuild?.storage && (
        <SelectedProductCard
          title="Storage"
          product={pcBuild.storage}
          handleRemove={handleRemove}
        />
      )}
      {pcBuild?.case && (
        <SelectedProductCard
          title="Case"
          product={pcBuild.case}
          handleRemove={handleRemove}
        />
      )}
      {pcBuild?.powerSupply && (
        <SelectedProductCard
          title="Power Supply"
          product={pcBuild.powerSupply}
          handleRemove={handleRemove}
        />
      )}

      {showDialog && <PcBuildDialog setShowDialog={setShowDialog} />}
    </div>
  );
};

export default PcBuildPage;
