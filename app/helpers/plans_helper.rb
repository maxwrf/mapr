module PlansHelper
  def category_label(category, col_size = 12)
    icons = {
      'shopping' => 'shopping-cart',
      'wildlife' => 'paw',
      'museum' => 'landmark',
      'park' => 'tree',
      'art gallery' => 'palette'
    }

    tag.div class: "category-choice col-xs-12 col-sm-#{col_size}" do
      # concat image_tag "#{category.downcase}.jpg"
      tag.span do
        concat tag.i class: "fas fa-#{icons[category.downcase]}"
        concat tag.br
        concat tag.span category
      end
    end
  end
end
